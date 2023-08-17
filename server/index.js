const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
const { connectToDb, getDb } = require('./db');
let db = null;

connectToDb((err)=>{
    if(err){
        console.log("Something went wrong with the server! Please try again later");
    }else{
        app.listen(5000, ()=>{
            console.log("Listening to port 5000");
        });
        db = getDb();
    }
})

app.get("/announcements", (req, res)=>{

    let announcements = [];
    db.collection("announcements")
    .find()
    .forEach(announcement => {
        announcements.push(announcement);
    })
    .then(
        ()=>{
            res.status(200).json(announcements);
        }
    )
    .catch(()=>{
        res.status(500).json("Could not get the announcements");
    })

});
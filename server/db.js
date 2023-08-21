const mongoose = require('mongoose');
let dbConnection = null;
const dbName = 'zvadb'; // Replace with your actual database name
const url = "mongodb+srv://acifliku21:Juve1234@aldrincluster.aq3n8ol.mongodb.net/zvadb?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
}

module.exports = {
    connectToDb: (cb)=>{
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then( () => {
        dbConnection = mongoose.connection;
        cb();
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    },
    getDb: ()=>dbConnection
}
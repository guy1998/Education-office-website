const { MongoClient } = require("mongodb");
let dbConnection = null;

module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect("mongodb://127.0.0.1:27017/zvadb")
            .then((client)=>{
                dbConnection = client.db()
                return cb();
            })
            .catch((err)=>console.log(err + "is it this?"))
    },
    getDb: ()=>dbConnection
}
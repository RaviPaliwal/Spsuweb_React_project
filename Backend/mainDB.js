const DB = require('mongoose');
DB.set('strictQuery', true);
// const uri = "mongodb://127.0.0.1:27017/SpsuData"
const uri = "mongodb+srv://ravipaliwal:Ravi%40885078@spsucseweb.tz2q1bs.mongodb.net/csespsu"
const connect = async ()=>{
    await DB.connect(uri,()=>{
        console.log("Connected To DB Successfully")
    })
}
module.exports = connect;
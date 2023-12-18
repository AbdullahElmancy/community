const  Mongoose  = require("mongoose");

const connectionDB = ()=>{
    Mongoose.connect('mongodb://127.0.0.1:27017/commuity')
    .then(()=>console.log("connect"))
    .catch(err=> console.log(err))
}

module.exports = connectionDB
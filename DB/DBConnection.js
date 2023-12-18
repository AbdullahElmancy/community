const  Mongoose  = require("mongoose");

const connectionDB = ()=>{
    Mongoose.connect(process.env.DATABASE)
    .then(()=>console.log("connect"))
    .catch(err=> console.log(err))
}

module.exports = connectionDB
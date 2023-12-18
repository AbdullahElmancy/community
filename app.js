const express = require("express")
const connectionDB = require("./DB/DBConnection")
const app = express()
const portListen = process.env.PORT
connectionDB()

app.use(express.json())

app.listen(portListen,()=> console.log("work"))

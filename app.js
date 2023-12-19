const express = require("express")
require('dotenv').config()
const connectionDB = require("./DB/DBConnection")
const { userRoute } = require("./routes/allroute.routes")
const app = express()
const portListen = process.env.PORT
connectionDB()

app.use(express.json())
app.use(userRoute)

app.listen(portListen,()=> console.log("work"))

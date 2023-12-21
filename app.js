const express = require("express")
const cor = require("cors")
require('dotenv').config()
const connectionDB = require("./DB/DBConnection")
const { userRoute } = require("./routes/allroute.routes")
const corsOptional = require("./public/functions/corsOptional")
const app = express()
const portListen = process.env.PORT

cor(corsOptional)
connectionDB()

app.use(express.json())
app.use(userRoute)

app.listen(portListen,()=> console.log("work"))

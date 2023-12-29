const express = require("express")
const cor = require("cors")
require('dotenv').config()
const connectionDB = require("./DB/DBConnection")
const path = require("path");
const { userRoute, postRoute } = require("./routes/allroute.routes")
const corsOptional = require("./public/functions/corsOptional")
const app = express()
const portListen = process.env.PORT

cor(corsOptional)
connectionDB()
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(express.json())
app.use(userRoute)
app.use(postRoute)

app.listen(portListen,()=> console.log("work"))

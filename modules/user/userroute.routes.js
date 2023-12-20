const route = require("express").Router()
const validationFunc = require("../../middlewares/valdationFunc")
const confirmed = require("./controllers/confirmed")
const signUp = require("./controllers/register")
const signIn = require("./controllers/signIn")
const signInValidition = require("./validation/signIn")
const signUpValidtion = require("./validation/signUp")

route.post("/signUp",validationFunc(signUpValidtion),signUp)
route.post("/signIn",validationFunc(signInValidition),signIn)
route.get("/user/confirmed/:token",confirmed)
module.exports = route
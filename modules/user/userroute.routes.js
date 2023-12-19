const route = require("express").Router()
const validationFunc = require("../../middlewares/valdationFunc")
const signUp = require("./controllers/register")
const signUpValidtion = require("./validation/signUp")
route.post("/signUp",validationFunc(signUpValidtion),signUp)

module.exports = route
const Joi = require("joi");

const signUpValidtion = {
    body:Joi.object().keys({
        email:Joi.string().email(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpassword:Joi.ref("password"),
    })
}
module.exports = signUpValidtion
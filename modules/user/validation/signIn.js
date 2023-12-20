const Joi = require("joi");

let signInValidition = {
    body:Joi.object().keys({
        email:Joi.string().email(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
}

module.exports = signInValidition
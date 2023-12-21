const Joi = require("joi");

const accountStatusValidation = {
    body:Joi.object().keys({
        id:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)),
        accountStatus:Joi.string().pattern(new RegExp(/^(active|block)$/))
    })
}
module.exports = accountStatusValidation
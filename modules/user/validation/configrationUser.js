const Joi = require("joi");

const configrationUSerValidation = {
    body:Joi.object().keys({
        userName:Joi.string().min(3).max(30),
        phone:Joi.string().pattern(new RegExp(/^[0-9]{11}$/)).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
        age:Joi.number().min(18).max(65),
        gender:Joi.string().pattern(new RegExp('^(male|female)')),
        socialLinks:Joi.array().items(Joi.string())
    })
}
module.exports = configrationUSerValidation
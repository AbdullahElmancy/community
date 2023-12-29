const Joi = require("joi");

const addPostValidation = {
    body:Joi.object().keys({
        title:Joi.string().min(3).max(18).required(),
        description:Joi.string().optional().min(3),
        tags:Joi.array().items(Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))),
        userID:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = addPostValidation
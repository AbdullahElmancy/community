const Joi = require("joi");

const updatePostValid = {
    body:Joi.object().keys({
        title:Joi.string().min(3).max(18).required(),
        description:Joi.string().optional().min(3)
    })
}

module.exports = updatePostValid
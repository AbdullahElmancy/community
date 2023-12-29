const Joi = require("joi");

const addCommentValid = {
    body:Joi.object().keys({
        description:Joi.string().optional().min(3),
        tags:Joi.array().items(Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))),
        idPost:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = addCommentValid
const Joi = require("joi");

const updateCommentValid = {
    body:Joi.object().keys({
        description:Joi.string().min(3)
    }),
    params:Joi.object().keys({
        idPost:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)),
        idComment:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = updateCommentValid
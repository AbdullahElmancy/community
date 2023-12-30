const Joi = require("joi");

const deleteCommentValid = {
    params:Joi.object().keys({
        idPost:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)),
        idComment:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = deleteCommentValid
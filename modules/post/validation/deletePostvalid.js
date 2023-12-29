const Joi = require("joi");

const deletePostValidation = {
    params:Joi.object().keys({
 
        id:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = deletePostValidation
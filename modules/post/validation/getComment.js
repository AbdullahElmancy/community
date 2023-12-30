const Joi = require("joi");

const getCommnetvalid = {
    params:Joi.object().keys({
 
        idPost:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    })
}

module.exports = getCommnetvalid
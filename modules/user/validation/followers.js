const Joi = require("joi");

const followersValidsation = {
    params:Joi.object().keys({
        id:Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
        })
}
module.exports = followersValidsation
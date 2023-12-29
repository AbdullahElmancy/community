const Joi = require("joi");

const getPost = {
    query:Joi.object().keys({
        page:Joi.number().optional(),
        limit:Joi.number().optional()
    })
}
module.exports = getPost
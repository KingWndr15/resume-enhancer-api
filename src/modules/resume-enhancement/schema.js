const Joi = require('joi')

const resumeSchemaParam = Joi.object({
    resumeId: Joi.string().required()
})

module.exports = resumeSchemaParam
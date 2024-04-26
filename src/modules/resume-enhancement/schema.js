const Joi = require('joi')

/**
 * Defines the schema for a resume object, which includes a required resumeId field.
 */
const resumeSchemaParam = Joi.object({
  resumeId: Joi.string().required(),
});

module.exports = resumeSchemaParam
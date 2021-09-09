const Joi = require('joi');

let personValidateSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required()
});

let personValidateSchemaForUpdate = Joi.object({
    firstname: Joi.string().optional(),
    lastname: Joi.string().optional()
});

let personValidateId = Joi.object({
    id : Joi.string()
            .required()
            .min(24)
            .max(24)
            .description('the id for the person object'),
});

// let personValidationFailAction = (request, h, error) => {
//     return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
// };

module.exports = {
    personValidateSchema,
    personValidateId,
    personValidateSchemaForUpdate,
    // personValidationFailAction
}
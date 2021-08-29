const mongoose = require('mongoose');
const Joi = require('joi');

const clientTempSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    NICofAccountHolder: {
        type: String,
        minlength: 12,
        maxlength: 12,
        required: true,
        unique: true
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    },

    serviceType: {
        type: String,
        required: true
    },

    documents: {
        type: [String],
        required: true
    }
});

const ClientTemp = mongoose.model('ClientTemp', clientTempSchema);

function validateClientTempSchema(clientTempSchema) {
    const schema = Joi.object({
        companyName: Joi.string().min(10).max(50).required(),
        NICofAccountHolder: Joi.string().min(12).max(12).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(20).required(),
        serviceType: Joi.string().required(),
        documents: Joi.string().required()
    }).options({ abortEarly: false });

    return schema.validate(clientTempSchema);
}

exports.ClientTemp = ClientTemp;
exports.validate = validateClientTempSchema;
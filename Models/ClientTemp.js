const mongoose = require('mongoose');
const Joi = require('joi');

const clientTempSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    serviceType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    district:{
        type:String,
        required:true
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
        maxlength: 200
    },
});

const ClientTemp = mongoose.model('ClientTemp', clientTempSchema);

function validateClientTempSchema(clientTempSchema) {
    const schema = Joi.object({
        companyName: Joi.string().min(5).max(250).required(),
        serviceType: Joi.string().required(),
        address: Joi.string().required(),
        district: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(200).required(),
    }).options({ abortEarly: false });

    return schema.validate(clientTempSchema);
}

exports.ClientTemp = ClientTemp;
exports.validate = validateClientTempSchema;
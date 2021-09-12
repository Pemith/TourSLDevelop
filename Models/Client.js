const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const clientSchema = new mongoose.Schema({
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
        maxlength: 255
    },

    serviceType: {
        type: String,
        required: true
    },

    address: {
        type: [String],
        required: true
    },

    district: {
        type: String,
        required: true
    }
});
clientSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}
const client = mongoose.model('Client', clientSchema);

function validateClient(client) {
    const schema = Joi.object({
        companyName: Joi.string().min(10).max(50).required(),
        NICofAccountHolder: Joi.string().min(12).max(12).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(255).required(),
        serviceType: Joi.string().required(),
        address: Joi.string().required(),
        district: Joi.string().required()
    }).options({ abortEarly: false });

    return schema.validate(client);
}

exports.Client = client;
exports.validate = validateClient;
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const clientSchema = new mongoose.Schema({
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
    contactNumber:{
        type:String,
        minlength:9,
        maxlength:10,
        required:true
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
clientSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id, 
        companyName:this.companyName,
        email:this.email,
        serviceType:this.serviceType
    }, 
    config.get('jwtPrivateKey'));
    return token;
}
const client = mongoose.model('Client', clientSchema);

function validateClient(client) {
    const schema = Joi.object({
        companyName: Joi.string().min(5).max(250).required(),
        serviceType: Joi.string().required(),
        contactNumber:Joi.string().min(9).max(10).required(),
        address: Joi.string().required(),
        district: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(200).required(),
    }).options({ abortEarly: false });

    return schema.validate(client);
}

exports.Client = client;
exports.validate = validateClient;
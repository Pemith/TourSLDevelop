const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const clientPhotosSchema = new mongoose.Schema({
    client: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 50
            }

        }),
        required: true
    },
    photos: {
        type: [String],
        required: true
    }
});

clientPhotosSchema.statics.lookup = function(clientId) {
    return this.findOne({
        'client._id': clientId
    });
}

const ClientPhotos = mongoose.model('ClientPhoto', clientPhotosSchema);

function validateClientPhotosSchema(clientPhotosSchema) {
    const schema = Joi.object({
        clientId: Joi.objectId().required(),
        photos: Joi.string().required()
    }).options({ abortEarly: false });

    return schema.validate(clientPhotosSchema);
}

exports.ClientPhotos = ClientPhotos;
exports.validate = validateClientPhotosSchema;
const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const clientLegalDocumentsSchema = new mongoose.Schema({
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
    fileName: {
        type: String,
        required: true
    },
    filePath:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    fileSize:{
        type:String,
        required:true
    }
});

clientLegalDocumentsSchema.statics.lookup = function(clientId) {
    return this.findOne({
        'client._id': clientId
    });
}
const ClientLegalDocuments = mongoose.model('ClientLegalDocument', clientLegalDocumentsSchema);

function validateClientLegalDocumentsSchema(clientLegalDocumentsSchema) {
    const schema = Joi.object({
        clientId: Joi.objectId().required(),
        documents: Joi.string().required()
    }).options({ abortEarly: false });

    return schema.validate(clientLegalDocumentsSchema);
}

exports.ClientLegalDocuments = ClientLegalDocuments;
exports.validate = validateClientLegalDocumentsSchema;
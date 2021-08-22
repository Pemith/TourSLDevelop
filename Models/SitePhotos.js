const mongoose=require('mongoose');
const Joi=require('joi');
const { string } = require('joi');

const sitePhotoSchema=new mongoose.Schema({
    site:{
        type:new mongoose.Schema({
            required:true
        }),
        required:true
    },

    photos: {
        type: String,
        required:true
    }    
});

const sitePhotos=mongoose.model('Site Photos',sitePhotoSchema);

function validatePhotoSchema(photo){
    
    const schema=Joi.object({
        siteId: Joi.objectId()
            .required(),
        photos: Joi.string()
            .required()
    }        
    ).options({abortEarly:false});


    return schema.validate(photo);
}


exports.sitePhotos=sitePhotos;
exports.validatePhotoSchema=validatePhotoSchema;
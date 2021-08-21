const mongoose=require('mongoose');
const Joi=require('joi');
const { string } = require('joi');

const sitePhotoSchema=new mongoose.Schema({
    photos: {
        type: String,
        required:true
    }    
});

const sitePhotos=mongoose.model('Site Photos',sitePhotoSchema);

function validatePhotoSchema(photo){
    
    const schema=Joi.object({
        photos: Joi.string()
            .required()
    }        
    ).options({abortEarly:false});


    return schema.validate(photo);
}


exports.sitePhotos=sitePhotos;
exports.validatePhotoSchema=validatePhotoSchema;
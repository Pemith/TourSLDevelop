const mongoose=require('mongoose');
const Joi=require('joi');

const religoiusSchema=new mongoose.Schema({

    site: {
        type:new mongoose.Schema({
            required:true
        }),
        required:true
    },
    
    type:{
        type: String,
        required: true
    },

    dress_code:{
        type: String,
        required: true
    }
});

const religiousPlace=mongoose.model('Religious_Place',religoiusSchema);

function validateRelPlaces(relPlace){
    const schema=Joi.object({
        siteId:Joi.objectId()
            .required(),
        type: Joi.string()
            .required(),
        dress_code: joi.string()
            .required()
    }).options({abortEarly:false});
}

exports.validateRelPlaces=validateRelPlaces;
exports.religiousPlace=religiousPlace;
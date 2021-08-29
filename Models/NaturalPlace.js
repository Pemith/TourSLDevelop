const mongoose=require('mongoose');
const Joi=require('joi');


const naturalPlaceSchema=new mongoose.Schema({
    
    site: {
        type:new mongoose.Schema({
            required:true
        }),
        required:true
    },
    scenary: {
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }
});

const naturalPlace=mongoose.model('Natural_Place',naturalPlaceSchema);

function validateNatPlaces(natPlace){
    const schema=Joi.object({
        siteId: Joi.objectId()
            .required(),
        scenary: Joi.string()
            .required(),
        description: Joi.string()
            .required()
    }).options({abortEarly:false});
}

exports.naturalPlace=naturalPlace;
exports.validateNatPlaces=validateNatPlaces;
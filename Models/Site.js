const mongoose=require('mongoose');
const Joi=require('joi');

const siteSchema=new mongoose.Schema({
    name: {
        type:String,
        min:3,
        max:255,
        required:true
    },

    district: {
        type: String,
        max: 255,
        required: true
    },

    address: {
        type :String,
        max:255
    },
    siteType: {
        type: String,
        max: 255,
        required:true
    },

    openHrs: {
        type: String,
        min:3,
        max: 20
    },

    description:{
        type:String,
        min:3,
        max:10000,
        required:true,
    },   
    date: {
        type:Date,
        required:true,
        default:Date.now
    }

});

const site=mongoose.model('site',siteSchema);

function siteValidation(site){
    const schema = Joi.object({
        name:Joi.string()
            .min(3)
            .max(255)
            .required(),
        district: Joi.string()
            .max(255)
            .required(),

        address: Joi.string()
            .max(255),
        siteType: Joi.string()
            .max(255)
            .required(),
        
        openHrs: Joi.string()
            .min(3)
            .max(20)
            .required(),
        description: Joi.string()
            .min(3)
            .max(10000)
            .required()
        

    }).options({abortEarly:false});

    return schema.validate(site);
}

exports.Site=site;
exports.validation=siteValidation;

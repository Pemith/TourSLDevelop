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
        max:255,
        required: true
    },
    siteType: {
        type: String,
        max: 255,
    },

    openHrs: {
        type: String,
        min:3,
        max: 20,
        required: true
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
            .max(255)
            .required(),
        siteType: Joi.string()
            .max(255),
        
        openHrs: Joi.string()
            .min(3)
            .max(20)
            .required()
        

    }).options({abortEarly:false});

    return schema.validate(site);
}

exports.Site=site;
exports.validation=siteValidation;

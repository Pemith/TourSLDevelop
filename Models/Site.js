const mongoose=require('mongoose');
const Joi=require('joi');

const siteSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    address: {
        type: String,
        max: 255,
        required:true
    },

    siteType: {
        type: String,
        max: 255,
        required:true
    },

    openHrs: {
        type: String,
        min:3,
        max: 20,
        required: true
    },

});

const site=mongoose.model('Site',siteSchema);

function siteValidation(site){
    const schema = Joi.object({
        name:Joi.string()
            .min(3)
            .max(10)
            .required(),

        address: Joi.string()
            .lowercase()
            .unique()
            .required(),
        siteType: Joi.string()
            .min(8)
            .max(10)
            .required(),
        
        openHrs: Joi.string()
            .min(3)
            .max(20)
            .required()

    }).options({abortEarly:false});

    return schema.validate(customer);
}

exports.site=site;
exports.siteValidation=siteValidation;
exports.siteSchema=siteSchema;
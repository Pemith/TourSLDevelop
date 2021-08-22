const mongoose=require('mongoose');
const Joi=require('joi');
const {siteSchema}=require('./Site');

//Goda goda
const siteDistrictSchema=new mongoose.Schema({

    site:{
        type:new mongoose.Schema({
            required:true
        }),
        required:true
    },

    address: {
        type: String,
        max: 255,
        required:true
    },
    district: {
        type: String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
});


const site=mongoose.model('Site_District',siteDistrictSchema);

function siteDistrictValidation(district){

    const schema=Joi.object({
        siteId: Joi.objectId()
            .required(),
        address: Joi.string()
            .required(),
        name: Joi.string()
            .required()
    }).options({abortEarly:false});

    return schema.validate(district);
}

exports.site=site;
exports.siteDistrictValidation=siteDistrictValidation;
const mongoose=require('mongoose');
const Joi=require('joi');
const {siteSchema}=require('./Site');

//Goda goda
const siteDistrictSchema=new mongoose.Schema({
    address: {
        type: siteSchema,
        required: true
    },
    name: {
        type: String,
        required:true,
    }
});


const site=mongoose.model('Site_District',siteDistrictSchema);

function siteDistrictValidation(district){

    const schema=Joi.object({
        address: Joi.string()
            .required(),
        name: Joi.string()
            .required()
    }).options({abortEarly:false});

    return schema.validate(district);
}

exports.site=site;
exports.siteDistrictValidation=siteDistrictValidation;
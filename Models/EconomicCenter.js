const mongoose=require('mongoose');
const Joi=require('joi');

const ecSchema=new mongoose.Schema({
    site:{
        type:new mongoose.Schema({
            required:true
        }),
        required:true
    },
    organizational_type: {
        type: String,
        required: true
    }

});

const ec=mongoose.model('Natural_Place',ecSchema);

function validateEC(natPlace){
    const schema=Joi.object({
        siteId: Joi.objectId()
            .required(),
        organizational_type: Joi.string()
            .required()
    }).options({abortEarly:false});
}

exports.economicCenters=ec;
exports.validateEC=validateEC;
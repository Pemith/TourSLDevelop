const mongoose=require('mongoose');
const Joi=require('joi');

const ecSchema=new mongoose.Schema({
    scenary: {
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }
});

const ec=mongoose.model('Natural_Place',ecSchema);

function validateEC(natPlace){
    const schema=Joi.object({
        scenary: Joi.string()
            .required(),
        description: Joi.string()
            .required()
    }).options({abortEarly:false});
}

exports.economicCenters=ec;
exports.validateEC=validateEC;
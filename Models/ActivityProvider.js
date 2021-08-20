const mongoose=require('mongoose');
const Joi=require('joi');

const apSchema=new mongoose.Schema({
    activityType: {
        type: String,
        required:true,
        minlength:5,
        maxlength:100
    },
    package:{
        type: String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    
});
const activityProvider=mongoose.model('ActivityProvider',apSchema);

function validateActivityProvider(ap){
    const schema=Joi.object({
        activityType:Joi.string().min(5).max(100).required(),
        package: Joi.string().required(),
        price: Joi.number().required()
    }).options({abortEarly:false});

    // const schema={
    //     activityType:Joi.string().min(5).max(100).required(),
    //     package: Joi.string().required(),
    //     price: Joi.number().required()
    // };
    try{
        //return Joi.validate(ap,schema);
        return schema.validate(ap);
    }

    catch(ex){
        console.log(ex.message);
    }
    
}

exports.ActivityProvider=activityProvider;
exports.validate=validateActivityProvider;
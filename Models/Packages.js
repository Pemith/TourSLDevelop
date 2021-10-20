const mongoose=require('mongoose');
const Joi=require('joi');
const moment = require('moment');

const packageSchema=new mongoose.Schema({
    
    client:{
        type:new mongoose.Schema({
        }),
        required:true
    },
    packageName:{
        type:String,
        max:20,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

packageSchema.statics.lookup=function(clientId){
    return this.findOne({
        'client._id':clientId
    })
}
const packages=mongoose.model('package',packageSchema);
 

function validatePackage(pkgs){
    const schema=Joi.object({
        clientId:Joi.objectId().required(),
        packageName:Joi.required(),
        price:Joi.required()
    }).options({abortEarly:false});
    return schema.validate(pkgs);
}

exports.Packages=packages;
exports.validate=validatePackage;
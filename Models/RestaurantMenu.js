const mongoose=require('mongoose');
const Joi=require('joi');
const moment =require('moment');
const { number } = require('joi');

const menuSchema=new mongoose.Schema({

    client:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            district:{
                type:String,
                required:true
            }
        }),
        required:true
    },
    menuItem:{
        type:String,
        max:20,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

menuSchema.statics.lookup=function(clientId){
    return this.findOne({
        'client._id':clientId
    })
}

const menu=mongoose.model('menu',menuSchema);

function validateMenu(menu){
    const schema=Joi.object({
        clientId:Joi.objectId().required(),
        menuItem:Joi.string().max(20).required(),
        price:Joi.number().required()
    }).options({abortEarly:false});
    return schema.validate(menu);
}

exports.Menu=menu;
exports.validate=validateMenu;

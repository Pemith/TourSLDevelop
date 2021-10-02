const jwt=require('jsonwebtoken');
const config=require('config');
const Joi = require('joi');
const mongoose=require('mongoose');


const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,      
    },

    password : {
        type:String,
        minlength:8,
        maxlength:256,
        required:true
    }
   
});
adminSchema.methods.generateAuthToken=function(){
    const token=jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email
        },
        config.get('jwtPrivateKey')
    );
    return token;
}

const admin=mongoose.model('admin',adminSchema);

function validateAdmin(admin){
    const schema = Joi.object({
        name:Joi.string().min(3).max(10).required(),
        email: Joi.string().required().email(),           
        password: Joi.string().min(8).max(256).required(),
        
    }).options({abortEarly:false});

    return schema.validate(admin);
}

exports.Admin=admin;
exports.validate=validateAdmin;
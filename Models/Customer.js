const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');


const customerSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:10
    },

    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
    },

    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:256
    }
});

customerSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
    return token;
}
const customer=mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).max(10).required(),
        email: Joi.string().required().email(),           
        password: Joi.string().min(8).max(256).required()
    }).options({abortEarly:false});

    return schema.validate(customer);
}

exports.Customer=customer;
exports.validate=validateCustomer;
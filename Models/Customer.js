const mongoose=require('mongoose');
const Joi=require('joi');


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
        maxlength:20
    }
});

const customer=mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).max(10).required(),
        email: Joi.string().required(),           
        password: Joi.string() .min(8) .max(20).required()
    }).options({abortEarly:false});

    return schema.validate(customer);
}

exports.Customer=customer;
exports.validate=validateCustomer;
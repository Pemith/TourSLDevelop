const mongoose=require('mongoose');
const Joi=require('joi');



var validateEmail =function(email){
    var re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}
const customerSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:10
    },

    email:{
        type:String,
        trim,
        lowercase:true,
        unique:true,
        required:true,
        validate:[validateEmail,'Please enter the email with a valid Email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Enter a valid email address']
    },

    password:{
        trype:String,
        required:true,
        minlength:8,
        maxlength:20
    }
});

const customer=mongoose.model('Custoemr',customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string()
            .min(3)
            .max(10)
            .required(),

        email: Joi.string()
            .lowercase()
            .unique()
            .required(),
        password: Joi.string()
            .min(8)
            .max(10)
            .required()

    }).options({abortEarly:false});

    return schema.validate(customer);
}

exports.customer=customer;
exports.validate=validateCustomer;
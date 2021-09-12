const bcrypt=require('bcrypt');
const _=require('lodash');
const {Customer}=require('../Models/Customer');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let customer=await Customer.findOne({email:req.body.email});
    if(!customer) {
        return res.status(400).send('Invalid Email or Password');
    }

    const validPassword=await bcrypt.compare(req.body.password,customer.password);
    if(!validPassword){
        return res.status(400).send('Invalid Email or Password');
    }

    const token=customer.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),           
        password: Joi.string() .min(8) .max(20).required()
    }).options({abortEarly:false});

    return schema.validate(req);
}

module.exports=router;
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();
const _=require('lodash');
const {Admin}=require('../Models/admin');


router.post('/', async (req,res)=>{

    const {error}=validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let admin=await Admin.findOne({email:req.body.email});
    if(!admin){
        return res.status(400).send('Invalid Email or Password');
    }

    const validPassword=await bcrypt.compare(req.body.password,admin.password);
    if(!validPassword){
        return res.status(400).send('Invalid Email or Password');
    }

    const token=admin.generateAuthToken();
    console.log('Admin Logged In successfully');
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
const authz=require("../middleware/Authorization");
const mongoose=require('mongoose');
const _=require('lodash');
const bcrypt=require('bcrypt');
const express=require('express');
const router=express.Router();
const {Customer,validate}=require('../Models/Customer');


router.get('/me',authz, async(req,res)=>{
    const customer=await Customer.findById(req.customer._id).select('-password');
    res.send(customer);
});

router.post('/',async (req,res)=>{

    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer=await Customer.findOne({email:req.body.email});
    if(customer){
        return res.status(400).send("User already Registered");
    }
    
    customer=new Customer({        
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt=await bcrypt.genSalt(10);
    customer.password=await bcrypt.hash(customer.password,salt);
    
    try{
        await customer.save();   
        const token=customer.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(customer,["_id","name","email"]));
    }

    catch(ex){
        console.log(ex.message);
    }
    
});


router.delete('/:id', async(req,res)=>{
    const ap=await Customer.findByIdAndRemove(req.params.id);

    if(!ap){
        return res.status(404).send("The ID is not found");
    }

    res.send(ap);
});

module.exports=router;
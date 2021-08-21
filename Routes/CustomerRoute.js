const {Customer,validate}=require('../Models/Customer');
const mongoose=require('mongoose');
const _=require('lodash');
const bcrypt=require('bcrypt');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    const customer=await Customer.find().sort('name');
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
    
    try{
        customer=await customer.save();   
        res.send(customer);
    }

    catch(ex){
        console.log(ex.message);
    }
    
});

router.put('./:id',async(req,res)=>{
    const {error}=validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const ap=await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        },
        {
            new:true
        }
    );

    if(!Customer){
        return res
            .status(404)
            .send("The Customer with the given id is not found");
    }
});

router.delete('/:id', async(req,res)=>{
    const ap=await Customer.findByIdAndRemove(req.params.id);

    if(!ap){
        return res.status(404).send("The ID is not found");
    }

    res.send(ap);
});

router.get(':id', async(req,res)=>{
    const ap=await Customer.findById(req.params.id);

    if(!ap){
        return res.status(404).send('The ID was not found');
    }
    res.send(ap);
});

module.exports=router;
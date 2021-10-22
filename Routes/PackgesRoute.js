const {Packages,validate}=require('../Models/Packages');
const { Client } = require('../Models/Client');
const _=require('lodash');
const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/',async(req,res) =>{

    const package=await Packages.find()
        .select("-__v")
        .sort('packageName');
    res.send(package);
});

router.post('/', async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const client=await Client.findById(req.body.clientId);
    if(!client){
        return res.status(400).send("invalid Client");
    }

    let packages=new Packages({
        client:{
            _id:client._id,
            name:client.companyName,
            district:client.district
        },
        packageName:req.body.packageName,
        price:req.body.price
    });

    try{
        packages=await packages.save();
        res.send(packages);
    }
    catch(ex){
        console.log(ex.message);
    }
} );

router.put("/:id",async(req,res) =>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const client=await Client.findById(req.body.clientId);
    if(!client){
        return res.status(400).send("invalid Client");
    }

    const package=await Packages.findByIdAndUpdate(
        req.params.id,
        {
            client:{
                _id:client._id,
            },
            packageName:req.body.packageName,
            price:req.body.price
        },
        {
            new:true
        }
    );

    if(!package){
        return res.status(404).send("This is an Invalid Package");
    }

    res.send(package);
})

router.get("/:id", async(req,res)=>{
    const package=await Packages.findById(req.params.id).select('-__v');

    if(!package){
        return res.status(404).send("The Package with the given Id is not found");
    }

    res.send(package);
});

module.exports=router;
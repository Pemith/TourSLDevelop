const {Menu,validate}=require('../Models/RestaurantMenu');
const { Client } = require('../Models/Client');
const _=require('lodash');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();


router.post('/', async(req,res)=>{
    const{error}=validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const client=await Client.findById(req.body.clientId);
    if(!client){
        return res.status(400).send("invalid Client");
    }

    let menu=new Menu({
        client:{
            _id:client._id,
            name:client.companyName
        },
        menuItem:req.body.menuItem,
        price:req.body.price
    });
    
    try {
        menu=await menu.save();
        res.send(menu);
    } catch (ex) {
        console.log(ex.message)
    }
});

module.exports=router;
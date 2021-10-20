const {Menu,validate}=require('../Models/RestaurantMenu');
const { Client } = require('../Models/Client');
const _=require('lodash');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get("/",async(req,res) =>{
    const menu=await Menu.find()
        .select("-__v");
    res.send(menu);
});


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

router.get("/:id",async(req,res) =>{
    const menu=await Menu.findById(req.params.id).select("-__v");

    if(!menu){
        return res.status(404).send("The Menu with the Id is not valid");
    }

    res.send(menu);
});

module.exports=router;
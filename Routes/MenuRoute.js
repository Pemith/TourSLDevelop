const {Menu,validate}=require('../Models/RestaurantMenu');
const { Client } = require('../Models/Client');
const _=require('lodash');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get("/",async(req,res) =>{
    const menu=await Menu.find()
        .select("-__v")
        .sort({mealType:-1} );
        
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
            name:client.companyName,
            district:client.district
            
        },
        menuItem:req.body.menuItem,
        price:req.body.price,
        mealType:req.body.mealType
    });
    
    try {
        menu=await menu.save();
        res.send(menu);
    } catch (ex) {
        console.log(ex.message)
    }
});

router.put('/:id',async(req,res)=>{

    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client=await Client.findById(req.body.clientId);
    if(!client){
        return res.status(400).send("invalid Client");
    }
    
    const menuUpdate=await Menu.findByIdAndUpdate(
        req.params.id,{
            
                client:{
                    _id:client._id,
                    name:client.companyName,
                    district:client.district
                },
            
            menuItem:req.body.menuItem,
            price:req.body.price,
            mealType:req.body.mealType
    
        },
        {new:true}
    );

    if(!menuUpdate){
        return res.status(400).send("Menu with the given ID is not found");
    }
    
    res.send(menuUpdate)

   
})

router.get("/:id",async(req,res) =>{
    const menu=await Menu.findById(req.params.id).select("-__v");

    if(!menu){
        return res.status(404).send("The Menu with the Id is not valid");
    }

    res.send(menu);
});

router.delete("/:id",async(req,res)=>{{
    const menu=await Menu.findByIdAndRemove(req.params.id);

    if(!menu){
        return res.status(404).send("The Menu Item is Not Valid");
    }

    res.send(menu);
}});

module.exports=router;
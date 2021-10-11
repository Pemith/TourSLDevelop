const {Restaurant, validate}=require('../Models/Restaurant');
const validateObjectId=require('../middleware/validateObjectId');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    const ap=await Restaurant.find().sort('activityType');
    res.send(ap);
});

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let ap=new Restaurant({
        cuisine:req.body.cuisine,
        menu:req.body.menu,
        diningType:req.body.diningType
    });
    try{
        ap=await ap.save();    
        res.send(ap);
    }

    catch(ex){
        console.log(ex.message);
    }
    
});

router.put("/:id", async(req,res)=>{

    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const ap=await Restaurant.findByIdAndUpdate(
        req.params.id,
        {name:req.body.name},
        {
            new:true
        }
    );

    if(!ap){
        return res.stauts(404).send("ID not found");
    }
    res.send(ap);
});


router.delete("/:id", async(req,res)=>{
    const ap=await Restaurant.findByIdAndRemove(req.params.id);

    if(!ap){
        return res.status(404).send("The ID is not found");
    }

    res.send(ap);
});

router.get('/:id', validateObjectId,async(req,res)=>{
    const ap=await Restaurant.findById(req.params.id);

    if(!ap){
        return res.status(404).send('The ID was not found');
    }
    res.send(ap);
});

module.exports=router;
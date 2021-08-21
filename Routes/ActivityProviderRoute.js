const {ActivityProvider, validate}=require('../Models/ActivityProvider');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    const ap=await ActivityProvider.find().sort('activityType');
    res.send(ap);
});

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let ap=new ActivityProvider({
        activityType:req.body.activityType,
        package:req.body.package,
        price:req.body.price
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

    const ap=await ActivityProvider.findByIdAndUpdate(
        req.params.id,
        {name:req.body.name},
        {
            new:true
        }
    );

    if(!ap){
        return res.stauts(404).send("ID not found");
    }
    res.send(activityProvider);
});


router.delete("/:id", async(req,res)=>{
    const ap=await ActivityProvider.findByIdAndRemove(req.params.id);

    if(!ap){
        return res.status(404).send("The ID is not found");
    }

    res.send(ap);
});

router.get(':id',async(req,res)=>{
    const ap=await ActivityProvider.findById(req.params.id);

    if(!ap){
        return res.status(404).send('The ID was not found');
    }
    res.send(ap);
});

module.exports=router;
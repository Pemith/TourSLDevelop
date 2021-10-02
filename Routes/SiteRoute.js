const {Site,validation}=require('../Models/Site');
const {sitePhotos,validatePhotoSchema}=require('../Models/SitePhotos');
const authz=require('../middleware/AuthorizationAdmin');
const validateObjectId=require("../middleware/validateObjectId");
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();



router.get('/', async (req,res)=>{

    const site=await Site.find()
        .select("-__v")
        .sort('name');
    res.send(site);
});


router.post('/', authz, async (req,res)=>{
    const {error}=validation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let site=await Site.findOne({email:req.body.name});
    if(site){
        return status(404).send('The Site already exist')
    }

    site=new Site({
        name:req.body.name,
        district:req.body.district,
        address:req.body.address,
        siteType:req.body.siteType,
        openHrs:req.body.openHrs
        
    });

    try {
       site=await site.save();
       res.send(site);
    } catch (ex) {
        console.log(ex.message);
    }
});


router.put('/:id', async(req,res)=>{
    const {error}=validation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const site=await Site.findByIdAndUpdate(
        req.params.id,
        {name:req.body.name},
        {
            new:true
        }
    );

    if(!site){
        return res.status(404).send('Id not found');
    }
    res.send(site);
});

router.delete('/:id',async(req,res)=>{

    const site=await Site.findByIdAndRemove(req.params.id);

    if(!site){
        return res.status(404).send('The ID was not found');
    }
    res.send(site);
});

router.get('/:id',validateObjectId,async(req,res)=>{
    const site=await Site.findById(req.params.id).select("-__v");

    if(!site){
        return res.status(404).send('The ID was not found');
    }
    res.send(site);
});

module.exports=router;

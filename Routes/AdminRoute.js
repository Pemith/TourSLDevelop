const _=require('lodash');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const {Admin,validate}=require('../Models/admin');
const authz=require('../middleware/AuthorizationAdmin');

router.get("/me", authz, async (req, res) => {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.send(admin);
});


router.post('/', async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let admin=await Admin.findOne({email:req.body.email});
    if(admin){
        return res.status(400).send('The Email Already Exists');
    }

    admin=new Admin(_.pick(req.body,["name","email","password"]));

    const salt =await bcrypt.genSalt(10);
    admin.password=await bcrypt.hash(admin.password,salt);

    try{
        await admin.save();
        const token=admin.generateAuthToken();
        res 
            .header('x-auth-token',token)
            .send(_.pick(admin,["_id","name","email"]));
    }
    catch(ex){
        console.log(ex.message);
    }
});

module.exports=router;


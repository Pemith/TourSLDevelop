const { Client, validate } = require('../Models/Client');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const client = await Client.find().sort('name');
    res.send(client);
});

router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let clientUserName=await Client.findOne({companyName:req.body.companyName});
    if(clientUserName){
        return res.status(400).send("User with the same Organization name is registered");
    }

    let client = await Client.findOne({ email: req.body.email });
    if (client) {
        return res.status(400).send("User already Registered");
    }

    client = new Client({
        companyName: req.body.companyName,
        serviceType: req.body.serviceType,
        workingHours:req.body.workingHours,
        contactNumber:req.body.contactNumber,
        address:req.body.address,
        district:req.body.district,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(client.password, salt);

    try {
        client = await client.save();
        res.send(client);
    } catch (ex) {
        console.log(ex.message);
    }

});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const cli = await Client.findByIdAndUpdate(
        req.params.id, {
            companyName: req.body.companyName,
            serviceType: req.body.serviceType,
            workingHours:req.body.workingHours,
            contactNumber:req.body.contactNumber,
            address:req.body.address,
            district:req.body.district,
            email: req.body.email,
            password: req.body.password
        }, {
            new: true
        }
    );

    if (!Client) {
        return res
            .status(404)
            .send("The Client with the given id is not found");
    }
});

router.delete('/:id', async(req, res) => {
    const cli = await Client.findByIdAndRemove(req.params.id);

    if (!cli) {
        return res.status(404).send("The ID is not found");
    }

    res.send(cli);
});

router.get('/:id', async(req, res) => {
    const cli = await Client.findById(req.params.id);

    if (!cli) {
        return res.status(404).send('The ID was not found');
    }
    res.send(cli);
});

module.exports = router;
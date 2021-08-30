const { ClientTemp, validate } = require('../Models/ClientTemp');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const clientTemp = await ClientTemp.find().sort('name');
    res.send(clientTemp);
});

router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let clientTemp = await ClientTemp.findOne({ email: req.body.email });
    if (clientTemp) {
        return res.status(400).send("User already Registered");
    }

    clientTemp = new ClientTemp({
        companyName: req.body.companyName,
        NICofAccountHolder: req.body.NICofAccountHolder,
        email: req.body.email,
        password: req.body.password,
        serviceType: req.body.serviceType,
        documents: req.body.documents
    });

    try {
        clientTemp = await clientTemp.save();
        res.send(clientTemp);
    } catch (ex) {
        console.log(ex.message);
    }

});

router.put('./:id', async(req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const cliTemp = await ClientTemp.findByIdAndUpdate(
        req.params.id, {
            companyName: req.body.companyName,
            NICofAccountHolder: req.body.NICofAccountHolder,
            email: req.body.email,
            password: req.body.password,
            serviceType: req.body.serviceType,
            documents: req.body.documents
        }, {
            new: true
        }
    );

    if (!ClientTemp) {
        return res
            .status(404)
            .send("The Client with the given id is not found");
    }
});

router.delete('/:id', async(req, res) => {
    const cliTemp = await ClientTemp.findByIdAndRemove(req.params.id);

    if (!cliTemp) {
        return res.status(404).send("The ID is not found");
    }

    res.send(cliTemp);
});

router.get(':id', async(req, res) => {
    const cliTemp = await ClientTemp.findById(req.params.id);

    if (!cliTemp) {
        return res.status(404).send('The ID was not found');
    }
    res.send(cliTemp);
});

module.exports = router;
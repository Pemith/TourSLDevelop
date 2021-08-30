const { ClientPhotos, validate } = require('../Models/ClientPhotos');
const { Client } = require('../Models/Client');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const clientPhotos = await ClientPhotos.find();
    res.send(clientPhotos);
});

router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Client.findById(req.body.clientId);
    if (!client) return res.status(400).send("Invalid client.");

    let clientPhotos = new ClientPhotos({
        client: {
            _id: client._id,
            name: client.companyName
        },
        photos: req.body.photos
    });

    try {
        clientPhotos = await clientPhotos.save();
        res.send(clientPhotos);
    } catch (ex) {
        console.log(ex.message);
    }

});

router.put('./:id', async(req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const cliPhotos = await ClientPhotos.findByIdAndUpdate(
        req.params.id, {
            photos: req.body.photos
        }, {
            new: true
        }
    );

    if (!ClientPhotos) {
        return res
            .status(404)
            .send("The photo of the given id was not found");
    }
});

router.delete('/:id', async(req, res) => {
    const cliPhotos = await ClientPhotos.findByIdAndRemove(req.params.id);

    if (!cliPhotos) {
        return res.status(404).send("The ID is not found");
    }

    res.send(cliPhotos);
});

router.get(':id', async(req, res) => {
    const cliPhotos = await ClientPhotos.findById(req.params.id);

    if (!cliPhotos) {
        return res.status(404).send('The ID was not found');
    }
    res.send(cliPhotos);
});

module.exports = router;
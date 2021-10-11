const { ClientLegalDocuments, validate } = require('../Models/ClientLegalDocuments');
const { Client } = require('../Models/Client');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const clientLegalDocuments = await ClientLegalDocuments.find();
    res.send(clientLegalDocuments);
});

router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Client.findById(req.body.clientId);
    if (!client) return res.status(400).send("Invalid client.");

    //let clientLegalDocuments = await ClientLegalDocuments.findById({cl: req.body.clientId});
    //if (clientLegalDocuments) {
    // return res.status(400).send("Documents are already entered of the client");
    //}

    let clientLegalDocuments = new ClientLegalDocuments({
        client: {
            _id: client._id,
            name: client.companyName
        },
        documents: req.body.documents
    });

    try {
        clientLegalDocuments = await clientLegalDocuments.save();
        res.send(clientLegalDocuments);
    } catch (ex) {
        console.log(ex.message);
    }

});

router.put('./:id', async(req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const cliLD = await ClientLegalDocuments.findByIdAndUpdate(
        req.params.id, {
            documents: req.body.documents
        }, {
            new: true
        }
    );

    if (!ClientLegalDocuments) {
        return res
            .status(404)
            .send("The document of the given id was not found");
    }
});

router.delete('/:id', async(req, res) => {
    const cliLD = await ClientLegalDocuments.findByIdAndRemove(req.params.id);

    if (!cliLD) {
        return res.status(404).send("The ID is not found");
    }

    res.send(cliLD);
});

router.get('/:id', async(req, res) => {
    const cliLD = await ClientLegalDocuments.findById(req.params.id);

    if (!cliLD) {
        return res.status(404).send('The ID was not found');
    }
    res.send(cliLD);
});

module.exports = router;
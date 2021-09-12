const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Client } = require('../Models/Client');


router.post('/', async(req, res) => {

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let client = await Client.findOne({ email: req.body.email });
    if (!client) {
        return res.status(400).send('Invalid Email or Password');
    }

    const validPassword = await bcrypt.compare(req.body.password, client.password);
    if (!validPassword) {
        return res.status(400).send('Invalid Email or Password');
    }

    const token = client.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required()
    }).options({ abortEarly: false });

    return schema.validate(req);
}

module.exports = router;
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const activityProvider = require('./Routes/ActivityProviderRoute');
const customer = require('./Routes/CustomerRoute');
const client = require('./Routes/ClientRoute');
const clientLegalDocuments = require('./Routes/ClientLegalDocumentsRoute');
const clientPhotos = require('./Routes/ClientPhotosRoute');
const clientTemp = require('./Routes/ClientTempRoute');
const express = require('express');
const app = express();


const url = 'mongodb://localhost:27017/TourSLDB';

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("Connected to MongoDB...", url))
    .catch(err => console.error('Could not connected to the DB', err));

app.use(express.json());
app.use('/api/activityprovider', activityProvider);
app.use('/api/customer', customer);
app.use('/api/client', client);
app.use('/api/clientLegalDocuments', clientLegalDocuments);
app.use('/api/clientPhotos', clientPhotos);
app.use('/api/clientTemp', clientTemp);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listeing on port ${port}...`));
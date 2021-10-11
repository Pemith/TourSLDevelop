const express=require('express');
const activityProvider = require('../Routes/ActivityProviderRoute');
const restaurant = require('../Routes/RestaurantRoute');
const customer = require('../Routes/CustomerRoute');
const authCustomer = require('../Routes/Auth');
const admin = require('../Routes/AdminRoute');
const authAdmin = require('../Routes/AuthAdmin');
const site = require('../Routes/SiteRoute');
const client = require('../Routes/ClientRoute');
const authClient = require('../Routes/AuthClient');
const clientLegalDocuments = require('../Routes/ClientLegalDocumentsRoute');
const clientPhotos = require('../Routes/ClientPhotosRoute');
const clientTemp = require('../Routes/ClientTempRoute');
const error=require('../middleware/error');
var cors=require('cors');

module.exports=function(app){
    app.use(express.json());
    app.use('/api/activityprovider',activityProvider);
    app.use('/api/restaurant',cors(), restaurant);
    app.use('/api/customer', cors(),customer);
    app.use('/api/authcustomer',authCustomer);
    app.use('/api/admin',admin);
    app.use('/api/authadmin',authAdmin);
    app.use('/api/site',cors(),site);
    app.use('/api/client', client);
    app.use('/api/clientLegaldocuments', cors(),clientLegalDocuments);
    app.use('/api/clientPhotos', clientPhotos);
    app.use('/api/clienttemp',cors(), clientTemp);
    app.use('/api/clientauth', cors(),authClient);
    app.use(error);
}
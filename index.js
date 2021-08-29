const config=require('config');
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const express=require('express');
const app=express();
const site=require('./Routes/SiteRoute');
const activityProvider=require('./Routes/ActivityProviderRoute');
const restaurant=require('./Routes/RestaurantRoute');
const customer=require('./Routes/CustomerRoute');
const authCustomer=require('./Routes/Auth');
const admin=require('./Routes/AdminRoute');
const authAdmin=require('./Routes/AuthAdmin');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const urlDB='mongodb+srv://pemithw:pemith12345@toursldb.rxady.mongodb.net/TourSLDB?retryWrites=true&w=majority';
//const urlDB='mongodb://localhost:27017/TourSLDB';

mongoose.connect(urlDB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(()=>console.log("Connected to MongoDB...",urlDB))
    .catch(err=>console.error('Could not connected to the DB',err));

app.use(express.json());
app.use('/api/activityprovider',activityProvider);
app.use('/api/restaurant',restaurant);
app.use('/api/customers',customer);
app.use('/api/auth',authCustomer);
app.use('/api/admin',admin);
app.use('/api/authadmin',authAdmin);
app.use('/api/site',site);



const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listeing on port ${port}...`));
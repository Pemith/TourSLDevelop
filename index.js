const mongoose=require('mongoose');
const Joi=require('joi');
const activityProvider=require('./Routes/CustomerRoute');
const customer=require('./Routes/CustomerRoute');
const express=require('express');
const app=express();


const url='mongodb://localhost:27017/TourSLDB';

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(()=>console.log("Connected to MongoDB...",url))
    .catch(err=>console.error('Could not connected to the DB',err));

app.use(express.json());
app.use('/api/activityprovider',activityProvider);
app.use('/api/customer',customer);


const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listeing on port ${port}...`));
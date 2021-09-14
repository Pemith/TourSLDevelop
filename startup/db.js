const winston=require('winston');
const mongoose = require('mongoose');

module.exports=function(){
    const urlDB = 'mongodb+srv://pemithw:pemith12345@toursldb.rxady.mongodb.net/TourSLDB?retryWrites=true&w=majority';
    //const urlDB = 'mongodb://localhost:27017/TourSLDB';
    mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => winston.info("Connected to MongoDB...", urlDB));
        
}
const winston = require("winston");
// require('winston-mongodb');
require('express-async-errors');


module.exports=function(){
    winston.handleExceptions(
        // new winston.transports.console({colorize:true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    );

    process.on('unhandledRejection', (ex) =>{
        throw ex;
    });

    winston.add(winston.transports.File,{ filename: 'logfile.log'});

    // winston.add(winston.transports.MongoDB,{
    //     db:'mongodb+srv://pemithw:pemith12345@toursldb.rxady.mongodb.net/TourSLDB?retryWrites=true&w=majority',
    //     level:'info'
    // });
}
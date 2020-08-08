const winston=require("winston");

const options={
    file:{
        filename:`info.log`,
        level:'info',
        handleExceptions:true,
        format: winston.format.json(), 
        json:true,
        colorize:true
    },
    console:{
        level:'info',
        handleExceptions:true,
        format: winston.format.json(),
        json:true,
        colorize:true
    }};

const logger=winston.createLogger({
    transports:[
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ]
});

module.exports=logger;
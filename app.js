const express = require("express");
const path = require("path");
const morgan = require('morgan');

const app = express();


// USER DEFINED MODULES 
const userRouter = require('./Routes/userRoute');


// CUSTOM MIDDLEWARE
const logger = (req,res,next)=>{
    console.log("he it's working");
    next();
}

// MIDDLEWARE
app.use(express.json());
app.use(express.static('./public'));
app.use(logger);

// Conditional Middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
    

};

// Router Middleware 
// app.use(userRouter);  will apply to all the path but right now we don't want that
app.use('/api/v1/users', userRouter);


module.exports = app;



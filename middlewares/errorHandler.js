"use strict";

module.exports = function(error,req,res, next){ // jshint ignore:line
    let errorObj = {
        name: error.name,
        message: error.message,
        stack: error.stack
    }
    console.log(new Date().toISOString()+"  :  ",error)
    if(error.statusCode){
        return res.status(error.statusCode).json(errorObj)
    }
    else if(error.name === "ValidationError"){
        return res.status(400).json(errorObj)
    }
    else if(error instanceof Error){
        return res.status(500).json(errorObj)
    }
    else{
        return res.status(500).json(errorObj)
    }
}
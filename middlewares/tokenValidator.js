"use strict";
const Token = require('unito/services/token')
const { MalformedTokenSuppliedError } = require("./../services/error")

module.exports = function(req,res,next){
    if(req.headers.authorization){
        var token = req.headers.authorization.split(" ")[1]
        if(Token.verify(token)){
            var decoded = Token.decode(token)
            req.user = Object.assign({},decoded)
            return next()
        }
        else{
            let error = new MalformedTokenSuppliedError("Malformed token supplied")
            return next(error)
        }
    }
    else{
        req.user = req.user || {}
        req.user.type = "unauthenticated"     
        return next()       
    }
}
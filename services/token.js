var jwt = require('jsonwebtoken');
var fs = require('fs');
var tokenConfigPath = require("path").resolve('./config/token.js')
var secret = require(tokenConfigPath).secret

var tokenObj = {}
tokenObj.create = function(payload,timeToExpire){
    if(secret){
        payload = {
            ...payload,
            iat: Math.floor(new Date().getTime()/1000), //issuedAt
            exp: Math.floor(new Date().getTime()/1000) + timeToExpire //expiry
        }
        var token = jwt.sign(payload, secret, { algorithm: 'HS512'});   
        return token
    }
    else{
        throw {"msg":"Please add secret in token.js in /config",status:500}
    }
}
tokenObj.verify = function(token){
    if(secret){
        try {
            var decoded = tokenObj.decode(token)
            if(typeof(decoded) == "object"){
                return true
            }
        } catch (error) {
            return false
        }
    }
    else{
        throw {"msg":"Please add secret in token.js in /config",status:500}
    }
}
tokenObj.decode = function(token){
    if(secret){
        return jwt.verify(token, secret,function(err,decoded){
            if(err){
                throw {"msg":err,status:500}
            }
            else{
                return decoded
            }
        });
    }
    else{
        throw {"msg":"Please add secret in token.js in /config",status:500}
    }
}
module.exports = tokenObj
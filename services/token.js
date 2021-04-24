'use strict';
const jwt = require('jsonwebtoken');
const findUp = require('find-up');
const { ModuleNotFoundError, TypeNotSetInPayloadError } = require("./error")
const tokenConfigPath = findUp.sync("./config/token.js")
if(!tokenConfigPath){
    throw new ModuleNotFoundError("config/token.js doesn't exist")
}
const tokenConfig = require(tokenConfigPath)
if(!tokenConfig.secret){
    throw new ModuleNotFoundError("Token secret not found in config/token.js")
}

/**
 * @example Token.create({"type":"authenticated"},1000)
 * @param {object} payload payload must include "type" field
 * @param {number} timeToExpire 
 * @returns {string} jwt token
 */
module.exports.create = function(payload={}, timeToExpire){
    if(!payload.type){
        throw new TypeNotSetInPayloadError("type field is required in token create payload")
    }
    
    payload = {
        ...payload,
        iat: Math.floor(new Date().getTime()/1000), //issuedAt
        exp: Math.floor(new Date().getTime()/1000) + timeToExpire //expiry
    }
    var token = jwt.sign(payload, tokenConfig.secret, { algorithm: 'HS512'});   
    
    return token
}

module.exports.verify = function(token){
    try {
        jwt.verify(token, tokenConfig.secret)
        return true
    } catch (error) {
        return false
    }
}

module.exports.decode = function(token){
    try {
        const decoded = jwt.verify(token, tokenConfig.secret)
        return decoded
    } catch (error) {
        throw error
    }
}
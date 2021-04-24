"use strict";
const mongoose = require('mongoose');
const findUp = require('find-up');
const { ModuleNotFoundError } = require("./error")

const connectionConfigPath = findUp.sync("./config/mongodb.js")
if(!connectionConfigPath){
    throw new ModuleNotFoundError("config/mongodb.js doesn't exist")
}
const connectionConfig = require(connectionConfigPath)
if(!connectionConfig.connection){
    throw new Error(`mongodb "connection" field not found in config/mongodb.js`)
}

const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const options = Object.assign({}, defaultOptions, connectionConfig.options )
let connection = null;
module.exports.init = function(){
    connection = setupMongoose(connectionConfig.connection,options)
    return connection
}
module.exports.getConnection = function(){
    return connection
}



function setupMongoose(path,options){
    const conn = mongoose.createConnection(path,options)
    
    conn.on('connected', function () {
        console.log(`connection to ${conn.name} mongodb was successful`);
    });
    conn.on('disconnected', function () {
        console.log(`${conn.name} connection is disconnected`);
    });
    
    conn.on('error', function (err) {
        console.log(err);
    });
    return conn
}
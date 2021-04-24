"use strict"
const { getConnection } = require("./mongodb")
const findUp = require('find-up');
const modelsPath = findUp.sync("./api/models",{ "type":"directory" })
const { ModuleNotFoundError } = require("./error")

if(!modelsPath){
    throw new ModuleNotFoundError("api/models folder doesn't exist")
}

const modelSchemas = require('require-all')({
    dirname     :  modelsPath,
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
      return name[0].toUpperCase()+name.substr(1).toLowerCase()
    }
});


module.exports = () => {
    return Object
    .keys(modelSchemas)
    .reduce((acc,schemaName)=>{
        let connection = getConnection()
        let model = connection.model(schemaName,modelSchemas[schemaName])
        acc[schemaName] = {}
        acc[schemaName].find = model.find
        acc[schemaName].findOne = model.findOne
        acc[schemaName].create = model.create
        acc[schemaName].update = model.findOneAndUpdate
        acc[schemaName].delete = model.deleteOne
        acc[schemaName].native = model.collection
        acc[schemaName].model = model
        return acc
    },{})
}
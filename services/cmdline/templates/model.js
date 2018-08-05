module.exports = function(model){
    var template = 
`/*--------------------------------------------------------------------------
Model : ${model[0].toUpperCase()}${model.substr(1).toLowerCase()}
--------------------------------------------------------------------------*/
var Schema = require('mongoose').Schema
var config = require('./../../config/middlewares')
var ObjectId = require('mongoose').Schema.Types.ObjectId

var ${model[0].toUpperCase()}${model.substr(1)}Schema = new Schema(
    {
        
    },
    {
        collection:"${model.toLowerCase()}",
        versionKey: false,
        timestamps:true,
    }
)
${model[0].toUpperCase()}${model.substr(1)}Schema.statics.safeAttributes = {
    "unauthenticated":
    {
        //"fieldName":true
    }
}

module.exports = ${model[0].toUpperCase()}${model.substr(1)}Schema`
    return template
}
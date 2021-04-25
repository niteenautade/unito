module.exports = function(model){
    var template = 
`/*--------------------------------------------------------------------------
Model : ${model[0].toUpperCase()}${model.substr(1).toLowerCase()}
--------------------------------------------------------------------------*/
"use strict";
const { Schema } = require("unito/node_modules/mongoose");
const ${model[0].toUpperCase()}${model.substr(1)}Schema = new Schema({
    
},
{
    collection:"${model.toLowerCase()}",
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // change values if snake_case needed
});

module.exports = ${model[0].toUpperCase()}${model.substr(1)}Schema`
    return template
}
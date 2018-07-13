module.exports = function(model){
    var template = 
`var Schema = require('unito/node_modules/mongoose').Schema
var ObjectId = require('unito/node_modules/mongoose').Schema.Types.ObjectId

var ${model[0].toUpperCase()}${model.substr(1)}Schema = new Schema(
    {
        
    },
    {
        collection:"${model.toLowerCase()}",
        versionKey: false,
        timestamps:true,
    }
)
//${model[0].toUpperCase()}${model.substr(1)}Schema.statics.secret = "This is my top secret"
module.exports = ${model[0].toUpperCase()}${model.substr(1)}Schema`
    return template
}
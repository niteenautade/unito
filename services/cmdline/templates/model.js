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
        toObject: {
            transform: function (doc, ret) {
                if(config._idtoid){
                    ret.id = ret._id  
                    delete ret._id
                }
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                if(config._idtoid){
                    ret.id = ret._id  
                    delete ret._id
                }
            }
        }
    }
)
//${model[0].toUpperCase()}${model.substr(1)}Schema.statics.secret = "This is my top secret"
module.exports = ${model[0].toUpperCase()}${model.substr(1)}Schema`
    return template
}
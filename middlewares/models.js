module.exports = function(mongoose,modelSchemas,config){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var modelSchema = modelSchemas[name]
        var schema = modelSchema
        var toObject = {
            transform: function (doc, ret) {
                if(config.middlewares._idtoid){
                    ret.id = ret._id  
                    delete ret._id
                }
            }
        }
        var toJSON = {
            transform: function (doc, ret) {
                if(config.middlewares._idtoid){
                    ret.id = ret._id  
                    delete ret._id
                }
            }
        }
        schema._userProvidedOptions.toObject = toObject
        schema.options.toObject = toObject
        schema._userProvidedOptions.toJSON = toJSON
        schema.options.toJSON = toJSON
        models[name] = mongoose.model(name,schema ) 
    });
    return models
}

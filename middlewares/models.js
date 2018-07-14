module.exports = function(mongoose,modelSchemas,config){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var modelSchema = modelSchemas[name]
        var schema = modelSchema
        models[name] = mongoose.model(name,schema ) 
    });
    return models
}

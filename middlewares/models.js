module.exports = function(mongoose,modelSchemas,config){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var schemaName = name[0].toUpperCase()+name.substring(1)
        var modelSchema = modelSchemas[name]
        let options = {collection:name,versionKey: false,timestamps:true }
        var schema = new mongoose.Schema(modelSchema.attributes[0],{...modelSchema.attributes[1],...options})
        if(config && config.middlewares && config.middlewares._idtoid){
            convert_IdToId(schema)
        }
        models[schemaName] = mongoose.model(schemaName,schema ) 
    });
    return models
}

function convert_IdToId(schema){
    schema.set('toJSON', {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
            }
       }); 
}
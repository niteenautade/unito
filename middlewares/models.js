module.exports = function(mongoose,modelSchemas,config){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var schemaName = name[0].toUpperCase()+name.substring(1)
        var modelSchema = modelSchemas[name]
        if(modelSchema.reference){
            let keys = Object.keys(modelSchema.reference)
            keys.forEach(key=>{
                modelSchema.attributes.properties[key] = { type: mongoose.Schema.Types.ObjectId, ref: modelSchema.reference[key].model }
            })
        }
        var options = {collection:name,versionKey: false,timestamps:true }
        if(!modelSchema.attributes.hasOwnProperty("additionalProperties")){
            options.strict = false
        }
        else{
            options.strict = !modelSchema.attributes.additionalProperties            
        }
        var schema = new mongoose.Schema(modelSchema.attributes.properties,options)
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
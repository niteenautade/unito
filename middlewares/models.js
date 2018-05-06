module.exports = function(mongoose,modelSchemas){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var schemaName = name[0].toUpperCase()+name.substring(1)
        var modelSchema = modelSchemas[name]
        if(modelSchema.reference){
            let keys = Object.keys(modelSchema.reference)
            keys.forEach(key=>{
                modelSchema.attributes[key] = { type: mongoose.Schema.Types.ObjectId, ref: modelSchema.reference[key].model }
            })
        }
        var schema = new mongoose.Schema(modelSchema.attributes,{collection:name,versionKey: false,timestamps:true })
        convert_IdToId(schema)
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
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
        
        
        Object.keys(modelSchema.attributes.properties)
        .forEach(modelSchemaProperty =>{
            var property = modelSchema.attributes.properties[modelSchemaProperty]
            
            let options = {_id : false}
            if(property && !property.hasOwnProperty("additionalProperties")){
                options.strict = false
            }
            else if(property && property.hasOwnProperty("additionalProperties")){
                options.strict = !property.additionalProperties            
            }

            if(property && typeof(property) == "object" && property.hasOwnProperty("type") && (property.type == "object" || property.type == "Object") && !Array.isArray(property)){
                var subDocumentSchema = new mongoose.Schema(property.properties,options)
                modelSchema.attributes.properties[modelSchemaProperty]["type"] = subDocumentSchema
            }

            // console.log(modelSchemaProperty,options)
            
            if(property && typeof(property) == "object" && property.hasOwnProperty("type") && (property.type == "array" || property.type == "Array")  && !Array.isArray(property)&& property.items && (property.items.type == "object" || property.items.type == "Object")){
                options = {_id : false}
                if(property && !property.items.hasOwnProperty("additionalProperties")){
                    options.strict = false
                }
                else if(property && property.items.hasOwnProperty("additionalProperties")){
                    options.strict = !property.additionalProperties            
                }
                var subDocumentSchema = new mongoose.Schema(property.items.properties,options)
                modelSchema.attributes.properties[modelSchemaProperty]["type"] = [subDocumentSchema]
            }

            else if(property && typeof(property) == "object" && property.hasOwnProperty("type") && (property.type == "array" || property.type == "Array")  && !Array.isArray(property)&& property.items){
                options = {_id : false}
                if(property && !property.items.hasOwnProperty("additionalProperties")){
                    options.strict = false
                }
                else if(property && property.items.hasOwnProperty("additionalProperties")){
                    options.strict = !property.additionalProperties            
                }
                var subDocumentSchema = new mongoose.Schema(property.items.properties,options)
                modelSchema.attributes.properties[modelSchemaProperty]["type"] = [subDocumentSchema]
            }

        })
        // console.log(JSON.stringify(modelSchema,null,4))
        let options = {collection:name,versionKey: false,timestamps:true }
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
module.exports = function(mongoose,modelSchemas){
    var models ={}
    Object.keys(modelSchemas).forEach((name,i) => {
        var schemaName = name[0].toUpperCase()+name.substring(1)
        var schema = new mongoose.Schema(modelSchemas[name],{collection:name,versionKey: false,timestamps:true })
        schema.set('toJSON', {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
            }
       }); 
        models[schemaName] = mongoose.model(schemaName,schema ) 
    });
    return models
}
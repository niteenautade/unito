module.exports = function(query,model,config,services,mongooseApi){
    query = !query ? {} : query
    services.id2_id(query)
    return mongooseApi[model]['findOneAndRemove'](query)
    .then(data=>{
        if(!data){
            throw {status:404,msg:"Not found"}
        }
        services._id2id(data._doc)
        return data._doc
    })
}
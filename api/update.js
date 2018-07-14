module.exports = function(query,update,options,model,config,services,mongooseApi){
    query = !query ? {} : query
    services.id2_id(query)
    return mongooseApi[model]['findOneAndUpdate'](query,update,{new:true,...options})
    .then(data=>{
        if(!data){
            throw {status:404,msg:"Not found"}
        }
        services._id2id(data._doc)
        return data._doc
    })
}
module.exports = function(query,model,config,services,mongooseApi){
    query = !query ? {} : query
    services.id2_id(query)
    return mongooseApi[model]['findOne'](query)
    .then(data=>{
        if(!data){
            return
        }
        else{
            services._id2id(data._doc)
            return data._doc
        }
    })
}

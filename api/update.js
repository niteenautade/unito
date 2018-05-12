module.exports = function(query,update,options,model,config,services,mongooseApi){
    query = !query ? {} : query
    if(config && config.middlewares && config.middlewares._idtoid){
        services.id2_id(query)
    }
    return mongooseApi[model]['findOneAndUpdate'](query,update,{new:true,...options})
}
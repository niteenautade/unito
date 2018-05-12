module.exports = function(query,model,config,services,mongooseApi){
    query = !query ? {} : query
    if(config && config.middlewares && config.middlewares._idtoid){
        services.id2_id(query)
    }
    return mongooseApi[model]['findOneAndRemove'](query)
}
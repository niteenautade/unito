module.exports = function(query,model,config,services,mongooseApi){
    query = !query ? {} : query
    services.id2_id(query)
    return mongooseApi[model]['find'](query)
    /* .then(data=>{
        if(Array.isArray(data)){
            return data.map(a=>{
                services._id2id(a._doc)
                return a
            })
        }
        else{
            return data
        }
    }) */
}

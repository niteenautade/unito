module.exports = function(obj,model,config,services,mongooseApi){
    obj = !obj ? {} : obj
    if(config && config.middlewares && config.middlewares._idtoid){
        services.id2_id(obj)
    }

    let newObj = new mongooseApi[model](obj)
    return newObj.save()
    .then(data => data)
    .catch((error)=>{
        res.status(500).json(error)
    })
}
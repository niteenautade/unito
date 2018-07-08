module.exports = function(obj,model,config,services,mongooseApi){
    obj = !obj ? {} : obj
    let newObj = new mongooseApi[model](obj)
    return newObj.save()
    .then(data=>data)
    .then(data=>{
        services._id2id(data._doc)
        return data._doc
    })
    
}
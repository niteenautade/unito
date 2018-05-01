var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
var modelSchemas = require('require-all')({
    dirname     :  require("path").resolve('./models'),
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
var ObjectId = require('mongoose').Types.ObjectId
var _ = require("lodash")
module.exports = function(){
    var blueprints = {
        find : function(options){
            return function(req,res,next){
                let modelName = services.modelName(req);
                let reqParamsCopy = _.cloneDeep(req.Params)
                if(reqParamsCopy && reqParamsCopy.where){
                    reqParamsCopy.where = JSON.parse(reqParamsCopy.where)
                    if(reqParamsCopy.populate && reqParamsCopy.where.populate){
                        if(typeof(reqParamsCopy.populate)=="string" && reqParamsCopy.populate != reqParamsCopy.where.populate){
                            reqParamsCopy.where.populate = [reqParamsCopy.where.populate,reqParamsCopy.populate]
                        }
                        else if(Array.isArray(reqParamsCopy.populate) && !reqParamsCopy.populate.includes(reqParamsCopy.where.populate)){
                            reqParamsCopy.where.populate = [reqParamsCopy.where.populate, ...reqParamsCopy.populate]
                        }
                    }
                    reqParamsCopy = { ...reqParamsCopy, ...reqParamsCopy.where }
                }
                let paramsWithoutKeywords = removeKeywords(reqParamsCopy) //limit,populate,projection,sort,where
                var query = services.Api[modelName].find({...paramsWithoutKeywords})
                operations(query,reqParamsCopy)
                .then((data)=>{
                    if(options && options.hasNext){
                        res.locals.data = data
                        next()
                    }
                    else{
                        return res.json(data)
                    }
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            }
        },
        findOne :function(options){
            return function(req,res,next){
                let modelName = services.modelName(req)
                services.Api[modelName].findOne({...req.params})
                .then((data)=>{
                    if(options && options.hasNext){
                        res.locals.data = data
                        next()
                    }
                    else{
                        return res.json(data)
                    }
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            }
        },
        create : function(options){
            return function(req,res,next){
                let modelName = services.modelName(req)
                console.log(req.Params,req.body)
                var newObj = new services.Api[modelName](req.body)
                newObj.save()
                .then((data)=>{
                    if(options && options.hasNext){
                        res.locals.data = data
                        next()
                    }
                    else{
                        return res.json(data)
                    }
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            }
        },
        update : function(options){
            return function(req,res,next){
                let modelName = services.modelName(req)
                console.log(req.Params,req.body)
                services.Api[modelName].findByIdAndUpdate(req.params._id,{$set:{...req.body}},{new:true})
                .then((data)=>{
                    if(options && options.hasNext){
                        res.locals.data = data
                        next()
                    }
                    else{
                        return res.json(data)
                    }
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            }
        },
        destroy : function(options){
            return function(req,res,next){
                let modelName = services.modelName(req)
                console.log(req.Params,req.body)
                services.Api[modelName].findByIdAndRemove(req.params._id)
                .then((data)=>{
                    if(options && options.hasNext){
                        res.locals.data = data
                        next()
                    }
                    else{
                        return res.json(data)
                    }
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            }
        },


    }
    return blueprints
}

function operations(query,params) {
    return Promise.resolve()
    .then(()=>{
        if(params.projection){
            if(isStringObject(params.projection)){
                if(isObjectArray(params.projection)){
                    if(Array.isArray(params.projection)){
                        query = query.select(params.projection.join(" "))                        
                    }
                }
                else{
                    query = query.select(JSON.parse(params.projection))
                }
            }
            else{
                query = query.select(params.projection)
            }
        }
    })
    .then(()=>{
        if(params.limit){
            query = query.limit(parseInt(params.limit))
        }
    })
    .then(()=>{
        if(params.sort){
            if(isStringObject(params.sort)){
                if(isObjectArray(params.sort)){
                    if(typeof(params.sort)=="string"){
                        query = query.sort(JSON.parse(params.sort).toString())
                    }else if(Array.isArray(params.sort)){
                        query = query.sort(params.sort.join(" "))                        
                    }
                }
                else{
                    query = query.sort(JSON.parse(params.sort))
                }
            }
            else{
                query = query.sort(params.sort)
            }
        }
    })
    .then(()=>{
        if(params.populate){
            query = query.populate(params.populate)
        }
    })
    .then(()=>{
        return query
    })
    .then(data=>data)
    .catch(error=>error)
}
function removeKeywords(params){
    var copy = _.cloneDeep(params)
    delete copy.limit
    delete copy.sort
    delete copy.populate
    delete copy.projection
    delete copy.where
    return copy
}   

function isStringObject(str) {
    str = JSON.stringify(str);
    str = JSON.parse(str);console.log(str,typeof(str))
    if(typeof(str)=="string"){
        try {
            str = JSON.parse(str)
        } catch (e) {
            return false            
        }
    }
    return true
}

function isObjectArray(str) {
    str = JSON.stringify(str);
    str = JSON.parse(str);
    if(typeof(str)=="string"){
        try {
            str = JSON.parse(str)
        } catch (e) {
            return false            
        }
    }
    return Array.isArray(str);
}

var _ = require("lodash")
var cursorOperations = require('./cursorOperations')
var removeKeywords = require('./utils/removeKeywords')
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
var config = require('require-all')({
    dirname     :  require("path").resolve('./config'),
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
      return name.toLowerCase()
    }
});
module.exports = function(options){
    return function(req,res,next){
        let modelName = services.modelName(req);
        services.id2_id(req.params)
        services.id2_id(req.Params)
        let reqParamsCopy = _.cloneDeep(req.Params)

        let paramsWithoutKeywords = removeKeywords(reqParamsCopy) //limit,populate,projection,skip,sort,where,count
        paramsMergeIntoWhere(reqParamsCopy,paramsWithoutKeywords)
        console.log("modelName",modelName)
        var query = services.mongooseApi[modelName].find(reqParamsCopy.where,null)
        cursorOperations(query,reqParamsCopy)
        .then(data=>{
            if(Array.isArray(data)){
                return data.map(a=>{
                    services._id2id(a._doc)
                    return a._doc
                })
            }
            else{
                return data
            }
        })
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
            console.log("Error",error)
            res.status(500).json(error)
        })
    }
}

function paramsMergeIntoWhere(reqParamsCopy,paramsWithoutKeywords){
    if(reqParamsCopy){
        reqParamsCopy.where = reqParamsCopy.where ? reqParamsCopy.where : {}
        reqParamsCopy.where = {...reqParamsCopy.where,...paramsWithoutKeywords}        
    }
    return reqParamsCopy
    console.log("After",reqParamsCopy)
    
}
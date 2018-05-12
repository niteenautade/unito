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
        if(config && config.middlewares && config.middlewares._idtoid){
            services.id2_id(req.params)
            services.id2_id(req.Params)
        }
        let reqParamsCopy = _.cloneDeep(req.Params)

        paramsMergeIntoWhere(reqParamsCopy)

        let paramsWithoutKeywords = removeKeywords(reqParamsCopy) //limit,populate,projection,skip,sort,where
        
        var query = services.mongooseApi[modelName].find({...paramsWithoutKeywords},null)
        cursorOperations(query,reqParamsCopy)
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
}

function paramsMergeIntoWhere(reqParamsCopy){
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
}
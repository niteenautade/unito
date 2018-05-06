var _ = require("lodash")
var operations = require('./cursorOperations')
var removeKeywords = require('./utils/removeKeywords')
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
module.exports = function(options){
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
        let paramsWithoutKeywords = removeKeywords(reqParamsCopy) //limit,populate,projection,skip,sort,where
        var query = services.Api[modelName].find({...paramsWithoutKeywords},null)
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
}
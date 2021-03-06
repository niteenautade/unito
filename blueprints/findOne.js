var findUp = require("find-up")
var isObjectArray = require('./utils/isObjectArray')
var isStringObject = require('./utils/isStringObject')
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
var config = require('require-all')({
    dirname     :  findUp.sync('./config'),
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
      return name.toLowerCase()
    }
});
module.exports = function(options){
    return function(req,res,next){
        let modelName = services.modelName(req)
        services.id2_id(req.params)
        services.id2_id(req.Params)
        var query = services.mongooseApi[modelName].findOne({...req.params})
        if(req.Params.projection){
            if(isStringObject(req.Params.projection)){
                if(isObjectArray(req.Params.projection)){
                    if(Array.isArray(req.Params.projection)){
                        query = query.select(req.Params.projection.join(" "))                        
                    }
                }
                else{
                    query = query.select(req.Params.projection)
                }
            }
            else{
                query = query.select(req.Params.projection)
            }
        }
        if(req.Params.populate){
            query = query.populate(req.Params.populate)
        }
        query
        .then(data=>{
            if(!data){
                throw {status:404,msg:"Not found"}
            }
            services._id2id(data._doc)
            return data._doc
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
        .catch(next)
    }
}
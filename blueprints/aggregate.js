var _ = require("lodash")
var findUp = require("find-up")
var cursorOperations = require('./cursorOperations')
var removeKeywords = require('./utils/removeKeywords')
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
        let modelName = services.modelName(req);
        services.id2_id(req.params)
        services.id2_id(req.Params)

        if(!req.Params.where || Object.keys(req.Params.where) == 0 ){
            return {status:400,msg:"Empty pipeline provided"}
        }
        else{
            return services.mongooseApi[modelName].aggregate(req.Params.where)
            .then(data=>{
                if(Array.isArray(data)){
                    return data.map(a=>{
                        services._id2id(a)
                        return a
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
            .catch(next)
        }
    }
}
var findUp = require("find-up")
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
        services.mongooseApi[modelName].findOneAndUpdate({_id:req.params._id},{$set:{...req.body}},{new:true})
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
        .catch((error)=>{
            if(error.status && error.msg){
                return res.status(error.status).json(error)
            }
            else{
                return res.status(500).json(error)
            }
        })
    }
}
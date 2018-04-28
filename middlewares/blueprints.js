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
module.exports = function(){
    var blueprints = {
        find : function(req,res,next){
            let modelName = services.modelName(req)
            services.Api[modelName].find({...req.Params},function(err,data){
                if(err) throw err;
                res.json(data)
            })
        },
        findOne :function(req,res,next){
            let modelName = services.modelName(req)
            services.Api[modelName].findOne({...req.Params},function(err,data){
                if(err) throw err;
                res.json(data)
            })
        }

    }
    return blueprints
}
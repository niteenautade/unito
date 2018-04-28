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
            services.Api[modelName].find({...req.Params})
            .then((data)=>{
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },
        findOne :function(req,res,next){
            let modelName = services.modelName(req)
            services.Api[modelName].findOne({...req.Params})
            .then((data)=>{
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },
        updateOne :function(req,res,next){
            let modelName = services.modelName(req)
            console.log(req.Params,req.body)
            services.Api[modelName].findOneAndUpdate({_id:req.params._id},{$set:{...req.body}},{new:true})
            .then((data)=>{
                console.log(data)
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },


    }
    return blueprints
}
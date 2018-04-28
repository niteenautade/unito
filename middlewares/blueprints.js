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
        create :function(req,res,next){
            let modelName = services.modelName(req)
            console.log(req.Params,req.body)
            var newObj = new services.Api[modelName](req.body)
            newObj.save()
            .then((data)=>{
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },
        update :function(req,res,next){
            let modelName = services.modelName(req)
            console.log(req.Params,req.body)
            services.Api[modelName].findByIdAndUpdate(req.params._id,{$set:{...req.body}},{new:true})
            .then((data)=>{
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },
        destroy :function(req,res,next){
            let modelName = services.modelName(req)
            console.log(req.Params,req.body)
            services.Api[modelName].findByIdAndRemove(req.params._id)
            .then((data)=>{
                return res.json(data)
            })
            .catch((error)=>{
                res.status(500).json(error)
            })
        },


    }
    return blueprints
}
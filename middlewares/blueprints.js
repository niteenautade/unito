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
            req.models[modelName].find({...req.Params},function(err,data){
                if(err) throw err;
                console.log(data)
                res.json(data)
            })
            /* var chris = new req.models[modelName]({
                name: 'Chris'
              });
              chris.save(function(err) {
                if (err) throw err;
              
                console.log('User saved successfully!');
              }); */
        },
        findOne :function(req,res,next){
            let modelName = services.modelName(req)
            if(req.Params.id){
                req.Params._id = ObjectId(req.Params.id)
                delete req.Params.id
            }
            console.log("moels>",req.models)
            req.models[modelName].findOne({...req.Params},function(err,data){
                if(err) throw err;
                console.log(data)
                res.json(data)
            })
        }

    }
    return blueprints
}
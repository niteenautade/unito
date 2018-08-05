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
        var newObj = new services.mongooseApi[modelName](req.body)

        Promise.resolve()
        .then(()=>{
            if(Object.keys(req.Params).length==0){
                throw {msg:"No parameters supplied",status:400}
            }
            return newObj.save()
        })
        .then(data=>{
            services._id2id(data._doc)
            return data._doc
        })
        .then((data)=>{
            if(options && options.hasNext){
                res.locals.data = data
                next()
            }
            else{
                return res.status(201).json(data)
            }
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
    }
}
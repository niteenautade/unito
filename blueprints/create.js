var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });

module.exports = function(options){
    return function(req,res,next){
        let modelName = services.modelName(req)
        var newObj = new services.Api[modelName](req.body)
        newObj.save()
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
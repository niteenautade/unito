var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });

module.exports = function(options){
    return function(req,res,next){
        let modelName = services.modelName(req)
        services.Api[modelName].findOne({...req.params})
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
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });

module.exports = function(options){
    return function(req,res,next){
        let modelName = services.modelName(req)
        console.log(req.Params,req.body)
        services.Api[modelName].findByIdAndUpdate(req.params._id,{$set:{...req.body}},{new:true})
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
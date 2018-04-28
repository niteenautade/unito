var _ = require("lodash")
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
module.exports = function(app,controllers){
	Object.keys(controllers).map(key => {
		if(controllers[key].hasOwnProperty('find')){
			var routeName = key.replace("Controller","")
			app['get']('/'+routeName,
				(req,res,next)=>{
					req["Params"] = services.reqParams(req) 
					next()
				},
				controllers[key].find
			)
		}
		if(controllers[key].hasOwnProperty('findOne')){
			var routeName = key.replace("Controller","")
			app['get']('/'+routeName+'/:id',
				(req,res,next)=>{
					req["Params"] = services.reqParams(req) 
					next()
				},
				controllers[key].findOne
			)
		}
	})
	return app
}
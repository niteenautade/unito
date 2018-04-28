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
					services.reqParams(req)
					req.models = app.models
					next()
				},
				controllers[key].find
			)
		}
		if(controllers[key].hasOwnProperty('findOne')){
			var routeName = key.replace("Controller","")
			app['get']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.reqParams(req)
					req.models = app.models					
					next()
				},
				controllers[key].findOne
			)
		}
		if(controllers[key].hasOwnProperty('create')){
			var routeName = key.replace("Controller","")
			app['post']('/'+routeName,
				(req,res,next)=>{
					services.reqParams(req)
					req.models = app.models					
					next()
				},
				controllers[key].create
			)
		}
		if(controllers[key].hasOwnProperty('update')){
			var routeName = key.replace("Controller","")
			app['put']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.reqParams(req)
					req.models = app.models					
					next()
				},
				controllers[key].update
			)
		}
		if(controllers[key].hasOwnProperty('destroy')){
			var routeName = key.replace("Controller","")
			app['delete']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.reqParams(req)
					req.models = app.models					
					next()
				},
				controllers[key].destroy
			)
		}
	})
}
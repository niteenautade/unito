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
			var routeName = key.replace("controller","");
			app['get']('/'+routeName,
				(req,res,next)=>{
					services.aggregateParams(req);
					req.models = app.models;
					services.reqValidate(req)
					next()
				},
				controllers[key].find
			)
		}
		if(controllers[key].hasOwnProperty('findOne')){
			var routeName = key.replace("controller","")
			app['get']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.aggregateParams(req)
					req.models = app.models		
					services.reqValidate(req)								
					next()
				},
				controllers[key].findOne
			)
		}
		if(controllers[key].hasOwnProperty('create')){
			var routeName = key.replace("controller","");
			app['post']('/'+routeName,
				(req,res,next)=>{
					services.aggregateParams(req)
					req.models = app.models	
					services.reqValidate(req)									
					next()
				},
				controllers[key].create
			)
		}
		if(controllers[key].hasOwnProperty('update')){
			var routeName = key.replace("controller","")
			app['put']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.aggregateParams(req)
					req.models = app.models	
					services.reqValidate(req)									
					next()
				},
				controllers[key].update
			)
		}
		if(controllers[key].hasOwnProperty('destroy')){
			var routeName = key.replace("controller","")
			app['delete']('/'+routeName+'/:_id',
				(req,res,next)=>{
					services.aggregateParams(req)
					req.models = app.models
					services.reqValidate(req)									
					next()
				},
				controllers[key].destroy
			)
		}
	})
}
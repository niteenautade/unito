module.exports = function(app,controllers){
	Object.keys(controllers).map(key => {
		if(controllers[key].hasOwnProperty('find')){
			var routeName = key.replace("Controller","")
			app['get']('/'+routeName,function(req,res){
				res.send(controllers[key].find())
			})
		}
	})
	return app
}
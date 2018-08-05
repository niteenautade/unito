var _ = require("lodash")
var services = require('require-all')({
	dirname     :  __dirname+'/../services',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
});
var _routes = require('require-all')({
	dirname     :  __dirname+'/../routes',
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
});
var middlewares = require('require-all')({
	dirname     :  __dirname,
	filter      :   /(.+)\.js$/,
	excludeDirs :  /^\.(git|svn)$/,
	recursive   : true
  });
module.exports = function(app,config,controllers){
	Object.keys(controllers).map(key => {
		var routeName = key.replace("controller","");
		
		_routes.subRoutes(app,config,controllers,key,routeName,services,middlewares)
		_routes.find(app,config,controllers,key,routeName,services,middlewares)
		_routes.findOne(app,config,controllers,key,routeName,services,middlewares)
		_routes.create(app,config,controllers,key,routeName,services,middlewares)
		_routes.update(app,config,controllers,key,routeName,services,middlewares)
		_routes.destroy(app,config,controllers,key,routeName,services,middlewares)
	})
}

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
module.exports = function(app,controllers){
	Object.keys(controllers).map(key => {
		var routeName = key.replace("controller","");
		
		_routes.subRoutes(app,controllers,key,routeName,services,middlewares)
		_routes.find(app,controllers,key,routeName,services)
		_routes.findOne(app,controllers,key,routeName,services)
		_routes.create(app,controllers,key,routeName,services,middlewares)
		_routes.update(app,controllers,key,routeName,services,middlewares)
		_routes.destroy(app,controllers,key,routeName,services)
	})
}

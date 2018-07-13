module.exports = function(name){
var template =
`--------------------------------------------------------------------------
Name : ${name[0].toUpperCase()}${name.substr(1).toLowerCase()}Controller
--------------------------------------------------------------------------
var blueprints = require("unito/middlewares/blueprints")()
var Api = require("unito/api")

module.exports = {
	find : blueprints.find(),
	findOne : blueprints.findOne(),
	create : blueprints.create(),
	update : blueprints.update(),
	destroy : blueprints.destroy(),
}`
return template
}
module.exports = function(name){
var template =
`/*--------------------------------------------------------------------------
Controller : ${name[0].toUpperCase()}${name.substr(1).toLowerCase()}
--------------------------------------------------------------------------*/
var blueprints = require("unito/middlewares/blueprints")()
var Token = require("unito/services/token")
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
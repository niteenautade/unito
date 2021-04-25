module.exports = function(name){
var template =
`/*--------------------------------------------------------------------------
Controller : ${name[0].toUpperCase()}${name.substr(1).toLowerCase()}
--------------------------------------------------------------------------*/
const blueprints = require("../../blueprints");
const { Token } = require("unito")
module.exports = {
    find: blueprints.find(),
    findOne: blueprints.findOne(),
    create: blueprints.create(),
    update: blueprints.update(),
    deleteOne: blueprints.deleteOne(),
}`
return template
}
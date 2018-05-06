var blueprints = require('require-all')({
    dirname     :  __dirname + "/../blueprints",
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
var ObjectId = require('mongoose').Types.ObjectId
module.exports = function(){
    var blueprintController = {
        find : (options)=>blueprints.find(options),
        findOne :(options)=>blueprints.findOne(options),
        create : (options)=>blueprints.create(options),
        update : (options)=>blueprints.update(options),
        destroy : (options)=>blueprints.destroy(options)
    }
    return blueprintController
}
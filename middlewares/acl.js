const findUp = require('find-up');
var controllers = require('require-all')({
    dirname     :  findUp.sync('./api/controllers',{"type":"directory"}),
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
        let str = name.toLowerCase().split("controller")[0]
        return str[0].toUpperCase()+str.substr(1)
    }
});
const { ModuleNotFoundError, UnauthorizedAccessError } = require("./../services/error")

const aclPath = findUp.sync("./config/acl.js",{"type":"file"})
if(!aclPath){
    throw new ModuleNotFoundError("config/acl.js doesn't exist")
}
const acl = require(aclPath)
function aclMiddleware(req,res,next){
    let aclController = acl[req.user.type][req._unito.controller.name]
    let isAccessible = aclController[req._unito.controller.type]
    if(req.user.type && isAccessible){
        return next()
    }
    return next(new UnauthorizedAccessError("Route not accessible"))
}
module.exports = aclMiddleware
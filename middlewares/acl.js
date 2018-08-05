var findUp = require("find-up")
var acl = require(findUp.sync("config/acl.js"))

module.exports = [
    function(req,res,next){
        let userType = req.user.type
        if(acl[userType] || acl[userType[0].toUpperCase()+userType.substr(1)]){
            let controller = req.access.controller.split("controller")[0]
            let controllerAllowed = acl[userType] && acl[userType][controller[0].toUpperCase()+controller.substr(1)]
            let route = req.access.route
            let routeAllowed = acl[userType] && acl[userType][controller[0].toUpperCase()+controller.substr(1)] && acl[userType][controller[0].toUpperCase()+controller.substr(1)][route] 
            if(controllerAllowed && routeAllowed){
                return next()
            }
            else{
                var error = {"status":401,"msg":"Unauthorized Access"}
                return res.status(error.status).json(error)
            }
        }
        else{
            var error = {"status":401,"msg":"Unauthorized Access"}
            return res.status(error.status).json(error)
        }
    }
]
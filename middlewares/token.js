var Token = require('./../services/token')
module.exports = [
    function(req,res,next){
        if(req.headers.authorization){
            var token = req.headers.authorization.split(" ")[1]
            if(Token.verify(token)){
                var decoded = Token.decode(token)
                if(decoded.id){
                    req.user = req.user ? req.user : {}
                    req.user.id = decoded.id
                }
                if(decoded.type){
                    req.user = req.user ? req.user : {}
                    req.user.type = decoded.type
                }
                return next()
            }
            else{
                var error = {"status":401,"msg":"Malformed token supplied"}
                return res.status(error.status).json(error)
            }
        }
        else{
            req.user = req.user ? req.user : {}
            req.user.type = "unauthenticated"     
            return next()       
        }
    }
]
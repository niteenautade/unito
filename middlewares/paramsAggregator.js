'use strict';
module.exports = function(req,res,next){
    req.Params = Object.assign({},req.query,req.body,req.params)
    return next()
}
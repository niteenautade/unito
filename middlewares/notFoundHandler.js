"use strict";
const { NotFoundError } = require("./../services/error")
module.exports = function(req,res,next){
    return next(new NotFoundError("Not found"))
}
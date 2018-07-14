var _ = require("lodash")
module.exports = function(req,res,next){
    let paramsCopy = _.cloneDeep(req.params)
    let merged = _.merge(req.params,req.query,req.body)
    req.params = paramsCopy
    req.Params = merged
    return next()
}
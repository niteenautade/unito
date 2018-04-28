var _ = require("lodash")
module.exports = function(req){
    let paramsCopy = _.cloneDeep(req.params)
    let merged = _.merge(req.params,req.query)
    req.params = paramsCopy
    req.Params = merged
}
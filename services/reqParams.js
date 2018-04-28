var _ = require("lodash")
module.exports = function(req){
    return _.merge(req.params,req.query)
}
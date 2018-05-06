var _ = require("lodash")
module.exports = function (params){
    var copy = _.cloneDeep(params)
    delete copy.limit
    delete copy.sort
    delete copy.populate
    delete copy.projection
    delete copy.where
    return copy
}  
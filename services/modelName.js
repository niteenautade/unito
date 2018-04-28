module.exports = function(req) {
    return /\/\w+/.exec(req.path)[0].substring(1)
}
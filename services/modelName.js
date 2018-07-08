module.exports = function(req) {
    let str = /\/\w+/.exec(req.path)[0].substring(1)
    str = str.toLowerCase()
    return str
}
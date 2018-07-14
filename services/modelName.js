module.exports = function(req) {
    let str = /\/\w+/.exec(req.path)[0].substring(1)
    str = str[0].toUpperCase()+str.substring(1).toLowerCase()
    return str
}
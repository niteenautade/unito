module.exports = function(){
    return `module.exports = function(path){
        let str = /\/\w+/.exec(path)[0].substring(1)
        str = str[0].toUpperCase()+str.substring(1).toLowerCase()
        return str
    }`
}
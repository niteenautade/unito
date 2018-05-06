module.exports = function isStringObject(str) {
    str = JSON.stringify(str);
    str = JSON.parse(str);console.log(str,typeof(str))
    if(typeof(str)=="string"){
        try {
            str = JSON.parse(str)
        } catch (e) {
            return false            
        }
    }
    return true
}
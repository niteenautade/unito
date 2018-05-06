module.exports = function isObjectArray(str) {
    str = JSON.stringify(str);
    str = JSON.parse(str);
    if(typeof(str)=="string"){
        try {
            str = JSON.parse(str)
        } catch (e) {
            return false            
        }
    }
    return Array.isArray(str);
}
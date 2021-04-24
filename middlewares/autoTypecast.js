function typecast(value){
    let number_regex = /^-?\d*\.?\d*$/
    if(number_regex.test(value)){
        return Number(value)
    }
    let iso_string_regex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/
    if(iso_string_regex.test(value)){
        return new Date(value)
    }
    return value
}
function traverse(value){
    if(typeof(value) !== "object"){
        return typecast(value)
    }
    Object.keys(value).forEach(key=>{
        if(typeof(value[key]) != "object" ){
            value[key] = typecast(value[key])
        }
        else{
            value[key] = traverse(value[key])
        }
    })
    return value
}
module.exports = function(req,res,next){
    req.body = traverse(req.body)
    req.query = traverse(req.query)
    return next()
}
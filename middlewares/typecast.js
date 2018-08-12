var autocast = function(val){
    var integerRegex = /^[-+]?\d+$/
    var floatRegEx = /^-?\d+\.?\d*$/
    if(integerRegex.test(val)){
        val = Number.parseInt(val)
    }
    else if(floatRegEx.test(val)){
        val = Number.parseFloat(val)
    }
    else{
        try {
            val = JSON.parse(val)
        } catch (error) {
            // console.log(error)
        }
    }
    return val
}
module.exports = function(req,res,next){
    Object.keys(req.query).forEach(key=>{
        req.query[key] = autocast(req.query[key])
    })
    Object.keys(req.body).forEach(key=>{
        req.body[key] = autocast(req.body[key])
    })
    return next()
}
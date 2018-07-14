module.exports = function(req,res,next,routeName,services){
    var safeAttributes = req.models[services.modelName(req)].safeAttributes
    if(safeAttributes){
        var keys = Object.keys(safeAttributes)
        keys.forEach(key=>{
            if(typeof(safeAttributes[key]) === 'object'){
                if(key === req.user.type){
                    let fieldKeys = Object.keys(safeAttributes[key])
                    fieldKeys.forEach(fieldKey=>{
                        if(safeAttributes[key][fieldKey]){
                            if(req.Params.hasOwnProperty(fieldKey)){
                                delete req.Params[fieldKey]
                            }
                            if(req.body.hasOwnProperty(fieldKey)){
                                delete req.body[fieldKey]
                            }
                        }
                    })
                }
            }
            else{
                if(safeAttributes[key]){
                    if(req.Params.hasOwnProperty(key)){
                        delete req.Params[key]
                    }
                    if(req.body.hasOwnProperty(key)){
                        delete req.body[key]
                    }
                }
            }
        })
    }
    return next()
}
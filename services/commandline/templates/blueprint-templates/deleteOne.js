module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = ({callNext}) => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let queryPromise = model.deleteOne({_id:req.params._id})
    return queryPromise
    .then(data=>{
        if(callNext){
            res.locals.result = data
            return next()
        }
        return res.json(data)
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}

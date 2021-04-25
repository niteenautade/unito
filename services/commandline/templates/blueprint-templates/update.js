module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = () => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let params = req.Params
    let queryPromise = model.findOneAndUpdate({_id:req.params._id},{$set:params},{new:true})
    return queryPromise
    .then(data=>{
        return res.json(data)
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}
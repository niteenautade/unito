module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = () => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let queryPromise = model.deleteOne({_id:req.params._id})
    return queryPromise
    .then(data=>{
        return res.json(data)
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}

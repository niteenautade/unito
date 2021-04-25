module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = () => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let params = req.Params
    let queryPromise = model.create(params)
    return queryPromise
    .then(data=>{
        return res.status(201).json(data)
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}

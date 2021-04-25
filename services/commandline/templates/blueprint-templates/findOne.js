module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = () => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let params = req.Params
    let { populate,projection,...query } = params
    let queryPromise = model.findOne({_id:req.params._id})
    if(populate){
        queryPromise = queryPromise.populate(populate)
    }
    if(projection){
        try {
            projection = JSON.parse(projection)
        } catch (error) {
            throw new Error("Failed to parse projection")
        }
        queryPromise = queryPromise.select(projection)
    }
    return queryPromise
    .then(data=>{
        if(!data){
            return res.status(404).json({message:"Not found"})
        }
        return res.json(data)
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}
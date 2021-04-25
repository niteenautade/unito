module.exports = function(){
    return `"use strict"
const getModelName = require("./getModelName")
const Api = require("unito").getApi()
module.exports = () => (req,res,next) => {
    const modelName = getModelName(req.path)
    const model = Api[modelName].model
    let params = req.Params
    let { sort, skip, limit, populate, projection, where, count, ...query } = params
    if(where){
        where = JSON.parse(where)
    }
    let mongoQuery = Object.assign({},where,query)
    let queryPromise = model.find(mongoQuery)

    if(skip !== undefined){
        skip = Number(skip)
        queryPromise = queryPromise.skip(skip)
    }

    if(projection){
        try {
            projection = JSON.parse(projection)
        } catch (error) {
            throw new Error("Failed to parse projection")
        }
        queryPromise = queryPromise.select(projection)
    }

    if(sort){
        try {
            sort = JSON.parse(sort)
        } catch (error) {
            throw new Error("Failed to parse sort")
        }
        queryPromise = queryPromise.sort(sort)
    }
    
    if(limit !== undefined){
        limit = Number(limit)
        queryPromise = queryPromise.limit(limit)
    }

    if(populate){
        query = query.populate(populate)
    }

    if(count){
        queryPromise = queryPromise.countDocuments(query)
    }
    
    return queryPromise
    .then(data=>{
        if(count){
            return res.json({ count: data })
        }
        return res.json({
            items: data
        })
    })
    .catch(err=>{
        return next(new Error(err))
    })
}`
}
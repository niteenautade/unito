        
var isObjectArray = require('./utils/isObjectArray')
var isStringObject = require('./utils/isStringObject')
var findUp = require("find-up")
var config = require('require-all')({
    dirname     :  findUp.sync('./config'),
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
      return name.toLowerCase()
    }
  });

module.exports = function operations(query,params) {
    return Promise.resolve()
    .then(()=>{
        if(params.count){
            query = query.count(params.where)
        }
    })
    .then(()=>{
        if(params.skip){
            query = query.skip(Number(params.skip))
        }
    })
    .then(()=>{
        if(params.projection){
            if(isStringObject(params.projection)){
                if(isObjectArray(params.projection)){
                    if(Array.isArray(params.projection)){
                        query = query.select(params.projection.join(" "))                        
                    }
                }
                else{
                    query = query.select(params.projection)
                }
            }
            else{
                query = query.select(params.projection)
            }
        }
    })
    .then(()=>{
        if(params.limit){
            query = query.limit(parseInt(params.limit))
        }
        else if(config && config.middlewares && config.middlewares.defaultLimit){
            query = query.limit(config.middlewares.defaultLimit)
        }
        else{
            query = query.limit(50)            
        }
    })
    .then(()=>{
        if(params.sort){
            if(isStringObject(params.sort)){
                if(isObjectArray(params.sort)){
                    if(typeof(params.sort)=="string"){
                        query = query.sort(JSON.parse(params.sort).toString())
                    }else if(Array.isArray(params.sort)){
                        query = query.sort(params.sort.join(" "))                        
                    }
                }
                else{
                    query = query.sort(JSON.parse(params.sort))
                }
            }
            else{
                query = query.sort(params.sort)
            }
        }
    })
    .then(()=>{
        if(params.populate){
            query = query.populate(params.populate)
        }
    })
    .then(()=>{
        return query
    })
    .then(data=>data)
}

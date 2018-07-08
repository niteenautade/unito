var _id2id = require("./_id2id")
module.exports = new function(){
    this.setModels = function(models){
        var modelnames = Object.keys(models)
        modelnames.forEach(modelname=>{
            this[modelname] = models[modelname]

            //Replacing update method to findOneAndUpdate
            this[modelname].update = function(query,update,options){
                return models[modelname]["findOneAndUpdate"](query,update,{new:true,...options})
            }
            
        })
        delete this.setModels
    }
    return this
}
var _id2id = require("./_id2id")
module.exports = new function(){
    this.setModels = function(models){
        var modelnames = Object.keys(models)
        modelnames.forEach(modelname=>{
            this[modelname] = models[modelname]
        })
        delete this.setModels
    }
    return this
}
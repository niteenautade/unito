module.exports = new function(){
    this.setModels = function(models){
        var keys = Object.keys(models)
        keys.forEach(key=>{
            this[key] = models[key]
        })
    }
    return this
}
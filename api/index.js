var Api = require('require-all')({
    dirname     :  __dirname,
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
module.exports = new function(){
    this.setCustomApi = function(services,config){
        var mongooseApi = services.mongooseApi
        var models = Object.keys(mongooseApi)
        models.forEach(model=>{
            this[model] = {}
            this[model]['find'] = (query) => Api.find(query,model,config,services,mongooseApi)
            this[model]['findOne'] = (query) => Api.findOne(query,model,config,services,mongooseApi)
            this[model]['create'] = (obj) => Api.findOne(obj,model,config,services,mongooseApi)
            this[model]['update'] = (query,update,options) => Api.update(query,update,options,model,config,services,mongooseApi)
            this[model]['destroy'] = (query) => Api.destroy(query,model,config,services,mongooseApi)
        })
        delete this.setCustomApi
    }
    return this
}
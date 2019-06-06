module.exports = function(model,mongooseApi){
    return Promise.resolve(mongooseApi[model])
}
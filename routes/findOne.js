var mongoose = require("mongoose")

module.exports = function(app,controllers,key,routeName,services){
    if(controllers[key].hasOwnProperty('findOne')){
        app['get']('/'+routeName+'/:_subRouteName',
            (req,res,next)=>{
                services.aggregateParams(req)
                req.models = app.models		
                services.reqValidate(req)								
                next()
            },
            (req,res,next)=>{
                var _subRouteNameIsId =  mongoose.Types.ObjectId.isValid(req.params._subRouteName)
                if(_subRouteNameIsId){
                    req.params._id = req.params._subRouteName
                    delete req.params._subRouteName
                    next()
                }
            },
            controllers[key].findOne
        )
    }
}
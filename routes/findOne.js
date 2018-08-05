var mongoose = require("mongoose")

module.exports = function(app,config,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('findOne')){
        app['get']('/'+routeName+'/:_subRouteName',
            middlewares.token,
            (req,res,next)=>{
                req.access = {}
                req.access.controller = key
                req.access.route = "findOne"
                next()
            },
            middlewares.acl,
            (req,res,next)=>{
                if(config && config.middlewares._idtoid){
                    services._id2id(req.query)
                    services._id2id(req.body)
                    services._id2id(req.params)
                }
                next()
            },
            middlewares.aggregateParams,
            (req,res,next)=>{
                req.models = app.models		
                services.reqValidate(req)								
                next()
            },
            (req,res,next)=>{
                var _subRouteNameIsId =  mongoose.Types.ObjectId.isValid(req.params._subRouteName)
                console.log(middlewares)
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
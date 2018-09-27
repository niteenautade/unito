module.exports = function(app,config,controllers,key,routeName,services,middlewares){
    var newRoutes = Object.keys(controllers[key]).filter(subRouteName => !["find","findOne","create","update","destroy"].includes(subRouteName))
    if(newRoutes.length > 0){
        newRoutes.forEach(newRoute => {
            app['all']('/'+routeName+'/'+newRoute,
                middlewares.cors,
                middlewares.token,
                (req,res,next)=>{
                    req.access = {}
                    req.access.controller = key
                    req.access.route = newRoute
                    next()
                },
                middlewares.acl,            
                middlewares.connectBusboy,
                middlewares.typecast,                
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
                controllers[key][newRoute],
                middlewares.errorHandler
            )
        })
    }
}
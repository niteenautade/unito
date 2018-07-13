module.exports = function(app,controllers,key,routeName,services,middlewares){
    var newRoutes = Object.keys(controllers[key]).filter(subRouteName => !["find","findOne","create","update","destroy"].includes(subRouteName))
    if(newRoutes.length > 0){
        newRoutes.forEach(newRoute => {
            app['all']('/'+routeName+'/'+newRoute,
                middlewares.connectBusboy,        
                (req,res,next)=>{
                    services.aggregateParams(req)
                    req.models = app.models
                    services.reqValidate(req)									
                    next()
                },
                controllers[key][newRoute]
            )
        })
    }
}
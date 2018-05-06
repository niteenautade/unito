module.exports = function(app,controllers,key,routeName,services){
    var newRoutes = Object.keys(controllers[key]).filter(subRouteName => !["find","findOne","create","update","destroy"].includes(subRouteName))
    if(newRoutes.length > 0){
        newRoutes.forEach(newRoute => {
            app['get']('/'+routeName+'/'+newRoute,
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
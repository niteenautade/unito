module.exports = function(app,controllers,key,routeName,services){
    if(controllers[key].hasOwnProperty('create')){
        app['post']('/'+routeName,
            services.connectBusboy,
            (req,res,next)=>{
                services.aggregateParams(req)
                req.models = app.models	
                services.reqValidate(req)									
                next()
            },
            controllers[key].create
        )
    }
}
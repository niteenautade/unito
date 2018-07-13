module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('update')){
        app['put']('/'+routeName+'/:_id',
            middlewares.connectBusboy,        
            (req,res,next)=>{
                services.aggregateParams(req)
                req.models = app.models	
                services.reqValidate(req)									
                next()
            },
            controllers[key].update
        )
    }
}
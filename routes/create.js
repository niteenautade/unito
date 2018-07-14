module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('create')){
        app['post']('/'+routeName,
            middlewares.token,
            (req,res,next)=>{
                req.access = {}
                req.access.controller = key
                req.access.route = "create"
                next()
            },
            middlewares.acl,
            middlewares.connectBusboy,
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
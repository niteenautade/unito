module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('update')){
        app['put']('/'+routeName+'/:_id',
            middlewares.token,
            (req,res,next)=>{
                req.access = {}
                req.access.controller = key
                req.access.route = "update"
                next()
            },
            middlewares.acl,
            middlewares.connectBusboy,
            middlewares.aggregateParams,
            (req,res,next)=>{
                req.models = app.models	
                services.reqValidate(req)									
                next()
            },
            (req,res,next)=>{
                middlewares.safeAttributes(req,res,next,routeName,services)
            },            
            controllers[key].update
        )
    }
}
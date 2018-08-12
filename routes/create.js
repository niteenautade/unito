module.exports = function(app,config,controllers,key,routeName,services,middlewares){
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
            controllers[key].create
        )
    }
}
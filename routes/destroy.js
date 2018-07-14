module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('destroy')){
        app['delete']('/'+routeName+'/:_id',
            middlewares.token,
            (req,res,next)=>{
                req.access = {}
                req.access.controller = key
                req.access.route = "destroy"
                next()
            },
            middlewares.acl,
            (req,res,next)=>{
                services.aggregateParams(req)
                req.models = app.models
                services.reqValidate(req)									
                next()
            },
            controllers[key].destroy
        )
    }
}
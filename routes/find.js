module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('find')){
        app['get']('/'+routeName,
            middlewares.token,
            (req,res,next)=>{
                req.access = {}
                req.access.controller = key
                req.access.route = "find"
                next()
            },
            middlewares.acl,
            middlewares.aggregateParams,
            (req,res,next)=>{
                req.models = app.models;
                services.reqValidate(req)
                next()
            },
            controllers[key].find
        )
    }
}
module.exports = function(app,controllers,key,routeName,services,middlewares){
    if(controllers[key].hasOwnProperty('find')){
        app['get']('/'+routeName,
            middlewares.token,
            (req,res,next)=>{
                services.aggregateParams(req);
                req.models = app.models;
                services.reqValidate(req)
                next()
            },
            controllers[key].find
        )
    }
}
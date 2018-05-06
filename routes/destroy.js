module.exports = function(app,controllers,key,routeName,services){
    if(controllers[key].hasOwnProperty('destroy')){
        app['delete']('/'+routeName+'/:_id',
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
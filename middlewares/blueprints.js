module.exports = function(){
    var modelName;
    var blueprints = {
        find : function(req,res,next){
            modelName.find({},function(err,data){
                if(err) throw err;
                res.send(data)
            })
        }

    }
    return blueprints

}
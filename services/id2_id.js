module.exports = function(obj){
    if(obj && obj.id){
        obj._id = obj.id
        delete obj.id
    }
}
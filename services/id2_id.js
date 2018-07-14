var config = require('require-all')({
    dirname     :  require("path").resolve('./config'),
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
      return name.toLowerCase()
    }
  });
module.exports = function(obj){
    if(config && config.middlewares && config.middlewares._idtoid && obj && obj.id){
        obj._id = obj.id;
        delete obj.id
    }
}
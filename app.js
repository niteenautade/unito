var mongoose = require('mongoose');
var express = require("express")
var bodyParser = require('body-parser')
var customApi = require('./api')
var findUp = require('find-up')
var app = express()

var controllers = require('require-all')({
  dirname     :  findUp.sync('./api/controllers'),
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true,
  map     : function (name, path) {
    return name.toLowerCase()
  }
});
var middlewares = require('require-all')({
  dirname     :  __dirname+'/middlewares',
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});
var services = require('require-all')({
  dirname     :  __dirname+'/services',
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});
var modelSchemas = require('require-all')({
  dirname     :  findUp.sync('./api/models'),
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true,
  map     : function (name, path) {
    return name[0].toUpperCase()+name.substr(1).toLowerCase()
  }
});
var config = require('require-all')({
  dirname     :  findUp.sync('./config'),
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true,
  map     : function (name, path) {
    return name.toLowerCase()
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
middlewares.cors(app)
middlewares.blueprints(app)
middlewares.mongooseconnection(mongoose)
mongoose.Promise = Promise; 
app.models = middlewares.models(mongoose,modelSchemas,config)
services.mongooseApi.setModels(app.models)

customApi.setCustomApi(services,config)

app.all("/",function(req,res,next){
  var text = 
`<pre>
                                _   _           
                               (_) | |          
                _   _   _ __    _  | |_    ___  
               | | | | | '_ \\  | | | __|  / _ \\ 
               | |_| | | | | | | | | |_  | (_) |
                \\__,_| |_| |_| |_|  \\__|  \\___/ 
                 
</pre>            

`
  return res.send(text)
})
middlewares.routes(app,config,controllers)
module.exports = app
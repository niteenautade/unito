var mongoose = require('mongoose');
var express = require("express")
var bodyParser = require('body-parser')
var customApi = require('./api')
var app = express()

var controllers = require('require-all')({
  dirname     :  require("path").resolve('./api/controllers'),
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
  dirname     :  require("path").resolve('./api/models'),
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true,
  map     : function (name, path) {
    return name.toLowerCase()
  }
});
var config = require('require-all')({
  dirname     :  require("path").resolve('./config'),
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
middlewares.blueprints(app)
middlewares.connectBusboy(app)
middlewares.mongooseconnection(mongoose)
mongoose.Promise = Promise; 
app.models = middlewares.models(mongoose,modelSchemas,config)
services.mongooseApi.setModels(app.models)

customApi.setCustomApi(services,config)

middlewares.routes(app,controllers)
module.exports = app
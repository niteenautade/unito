var mongoose = require('mongoose');
var express = require("express")
var bodyParser = require('body-parser')
var app = express()

var controllers = require('require-all')({
  dirname     :  require("path").resolve('./controllers'),
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
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
  dirname     :  require("path").resolve('./models'),
  filter      :   /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
middlewares.blueprints(app)
middlewares.mongooseconnection(mongoose)
mongoose.Promise = Promise; 
app.models = middlewares.models(mongoose,modelSchemas)
services.Api.setModels(app.models)

middlewares.routes(app,controllers)
module.exports = app
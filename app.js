var mongoose = require('mongoose');
var express = require("express")
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

var blueprints = middlewares.blueprints
mongoose = middlewares.mongooseconnection(mongoose)
mongoose = middlewares.models

app = middlewares.routes(app,controllers)
module.exports = app
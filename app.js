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
console.log(middlewares)
mongoose = middlewares.mongooseconnection(mongoose)
app = middlewares.routes(app,controllers)
module.exports = app
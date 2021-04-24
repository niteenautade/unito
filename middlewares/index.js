'use strict';
const express = require("express");
const notFoundHandler = require("./notFoundHandler")
const errorHandler = require("./errorHandler")
module.exports.loadMiddlewares = function(app){
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    
    const routes = require("./../middlewares/routes")
    app.use(routes)
    app.use(notFoundHandler);

    app.use(errorHandler);
}
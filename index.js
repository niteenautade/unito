'use strict';
const express = require('express');
const { loadMiddlewares } = require("./middlewares");
const Token = require("./services/token")
const mongodb = require("./services/mongodb")

let getApi = require("./services/api")
function init(predefinedApp){
    mongodb.init()
    const app = predefinedApp ? predefinedApp : express()

    loadMiddlewares(app);
    return app
}

module.exports = {
    init,
    Token,
    getApi
}
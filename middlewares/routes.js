"use strict";
const express = require("express")
const findUp = require("find-up")
var router = express.Router({mergeParams:true})
var controllers = require('require-all')({
    dirname     :  findUp.sync('./api/controllers',{"type":"directory"}),
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
        let str = name.toLowerCase().split("controller")[0]
        return str[0].toUpperCase()+str.substr(1)
    }
});
const acl = require("./acl")
const tokenValidator = require("./tokenValidator")
const paramsAggregator = require("./paramsAggregator")
const connectBusboy = require("./connectBusboy")
const autoTypecast = require("./autoTypecast")

Object.keys(controllers).forEach(name=>{
    if(controllers[name].findOne){
        let subRoutes = Object.keys(controllers[name]).filter(a=>!["find","findOne","create","update","deleteOne"].includes(a))
        subRoutes.forEach(subRoute=>{
            router.all(`/${name.toLowerCase()}/${subRoute}`,[
                paramsAggregator,
                function(req,res,next){
                    req._unito = {}
                    req._unito.controller = {
                        "name": name,
                        "type": subRoute
                    }
                    return next()
                },
                tokenValidator,
                acl,
                controllers[name][subRoute]
            ])
        })
    }
    if(controllers[name].find){
        router.get(`/${name.toLowerCase()}`,[
            autoTypecast,
            paramsAggregator,
            function(req,res,next){
                req._unito = {}
                req._unito.controller = {
                    "name": name,
                    "type": "find"
                }
                return next()
            },
            tokenValidator,
            acl,
            controllers[name].find
        ])
    }
    if(controllers[name].findOne){
        router.get(`/${name.toLowerCase()}/:_id`,[
            paramsAggregator,
            function(req,res,next){
                req._unito = {}
                req._unito.controller = {
                    "name": name,
                    "type": "findOne"
                }
                return next()
            },
            tokenValidator,
            acl,
            controllers[name].findOne
        ])
    }
    if(controllers[name].create){
        router.post(`/${name.toLowerCase()}`,[
            paramsAggregator,
            function(req,res,next){
                req._unito = {}
                req._unito.controller = {
                    "name": name,
                    "type": "create"
                }
                return next()
            },
            tokenValidator,
            acl,
            connectBusboy,
            controllers[name].create
        ])
    }
    if(controllers[name].update){
        router.put(`/${name.toLowerCase()}/:_id`,[
            paramsAggregator,
            function(req,res,next){
                req._unito = {}
                req._unito.controller = {
                    "name": name,
                    "type": "update"
                }
                return next()
            },
            tokenValidator,
            acl,
            connectBusboy,
            controllers[name].update
        ])
    }
    if(controllers[name].deleteOne){
        router.delete(`/${name.toLowerCase()}/:_id`,[
            paramsAggregator,
            function(req,res,next){
                req._unito = {}
                req._unito.controller = {
                    "name": name,
                    "type": "deleteOne"
                }
                return next()
            },
            tokenValidator,
            acl,
            controllers[name].deleteOne
        ])
    }
})

module.exports = router
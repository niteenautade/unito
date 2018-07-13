#!/usr/bin/env node

var argv = require('yargs').argv
var path = require("path")
var fs = require('fs')
var config = require('./config')()

var keys = Object.keys(config)
keys.forEach(key=>{
    if(argv[key]){
        var template = require(path.resolve(__dirname,"templates/"+key))(argv[key])
        
        var suffix = config[key]["suffix"] ? config[key]["suffix"] : ""
        var filename = argv[key][0].toUpperCase()+argv[key].substr(1).toLowerCase()+suffix
        fs.writeFile(path.resolve(process.cwd(),config[key].output,filename), template, (err) => {
            if (err) throw err;
            console.log("Created at "+path.resolve(process.cwd(),config[key].output,filename));
        });
    }
})

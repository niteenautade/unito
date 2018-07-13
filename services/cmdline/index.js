#!/usr/bin/env node

var argv = require('yargs').argv
var path = require("path")
var fs = require('fs')
var config = require('./config')()
var templates = require('require-all')({
    dirname     :  __dirname + '/templates',
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})

function createDirectory(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log("Created "+dir)
    }
}

if(argv["_"][0]==="init"){
    var arr = [
        "./api",
        "./api/controllers",
        "./api/models",
        "./api/services",
        "./config"
    ]
    arr.forEach(a => createDirectory(a))

    fs.writeFileSync(path.resolve(process.cwd(),"config/middlewares.js"),templates.middlewares() )
    fs.writeFileSync(path.resolve(process.cwd(),"config/mongoconnection.js"),templates.mongoconnection() )
    fs.writeFileSync(path.resolve(process.cwd(),"config/token.js"),templates.token() )

}
else{
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
}

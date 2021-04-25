#!/usr/bin/env node

var fs = require("fs")
var path = require("path")
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
// const argv = yargs(hideBin(process.argv)).argv
var config = require('./config')()
var templates = require('require-all')({
    dirname     :  __dirname + '/templates',
    filter      :   /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})
var cmd=require('node-cmd');

function createDirectory(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log("Created "+dir)
    }
}
function checkFileExists(path){
    return new Promise((resolve,reject)=>{
        try {
            if (fs.existsSync(path)) {
                resolve(true)
            }
        } catch(err) {
            resolve(false)
        }
    })
}

yargs(hideBin(process.argv))
  .command('init', 'initialize your unito project', (yargs) => {
    return yargs
  }, (argv) => {
    var arr = [
        "./api",
        "./api/controllers",
        "./api/models",
        "./api/services",
        "./config",
        "./blueprints"
    ]
    arr.forEach(a => createDirectory(a))
    //blueprints
    let blueprints = Object.keys(templates.blueprint)
    blueprints.forEach(name=>{
        fs.writeFileSync(path.resolve(process.cwd(),`blueprints/${name}.js`),templates.blueprint[name] )
    })

    fs.writeFileSync(path.resolve(process.cwd(),"config/mongodb.js"),templates.mongodb() )
    fs.writeFileSync(path.resolve(process.cwd(),"config/token.js"),templates.token() )
    fs.writeFileSync(path.resolve(process.cwd(),"config/acl.js"),templates.acl() )
    fs.writeFileSync(path.resolve(process.cwd(),"config/cors.js"),templates.cors() )
    fs.writeFileSync(path.resolve(process.cwd(),"index.js"),templates.app() )
    fs.writeFileSync(path.resolve(process.cwd(),"package.json"),templates.package() )
    cmd.run("unito model user")
    cmd.run("unito controller user")
    
    console.log("<<<<< Project successfully initiated >>>>>")
    console.log("\n")
    console.log("Run \"npm i\" to install node modules")
  })
  .command('controller [name]', 'create controller', (yargs) => {
    return yargs
    .positional('name', {
        describe: 'name of controller',
        default: null
      })
  }, async (argv) => {
    const key = "controller"
    const name = argv.name
    if(!name){
        console.log("Name not found")
        return
    }
    var template = require(path.resolve(__dirname,"templates/"+key))(name)

    var suffix = config[key]["suffix"] ? config[key]["suffix"] : ""
    var filename = name[0].toUpperCase()+name.substr(1).toLowerCase()+suffix

    const filePath = path.resolve(process.cwd(),config[key].output,filename)
    const fileExists = await checkFileExists(filePath)
    if(fileExists){
        console.error(`Failed to create controller\n${filename} controller already exists`)
        return
    }
    fs.writeFile(filePath, template, (err) => {
        if (err) throw err;
        console.log("Created at "+path.resolve(process.cwd(),config[key].output,filename));
    });
  })
  .command('model [name]', 'create model', (yargs) => {
    return yargs
    .positional('name', {
        describe: 'name of model',
        default: null
      })
  }, async(argv) => {
    const key = "model"
    const name = argv.name
    if(name){
        var template = require(path.resolve(__dirname,"templates/"+key))(name)
        var suffix = config[key]["suffix"] ? config[key]["suffix"] : ""
        var filename = name[0].toUpperCase()+name.substr(1).toLowerCase()+suffix
        const filePath = path.resolve(process.cwd(),config[key].output,filename)
        const fileExists = await checkFileExists(filePath)
        if(fileExists){
            console.error(`Failed to create model\n${filename} model already exists`)
            return
        }
        fs.writeFile(filePath, template, (err) => {
            if (err) throw err;
            console.log("Created at "+path.resolve(process.cwd(),config[key].output,filename));
        });
    }
  })
  .command('blueprints', 'create blueprint APIs', (yargs) => {
    return yargs
  }, (argv) => {
    var arr = [
        "./blueprints"
    ]
    arr.forEach(a => createDirectory(a))
    //blueprints
    let blueprints = Object.keys(templates.blueprint)
    blueprints.forEach(name=>{
        fs.writeFileSync(path.resolve(process.cwd(),`blueprints/${name}.js`),templates.blueprint[name] )
    })
    console.log("Successfully created blueprints")
  })
  .argv

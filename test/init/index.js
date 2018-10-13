var fs = require("fs")

module.exports = function() {
    var deleteFolderRecursive = function(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    deleteFolderRecursive("./../../api")
    deleteFolderRecursive("./../../config")

    if (fs.existsSync("./../../app.js")) {
        fs.unlinkSync("./../../app.js")
    }
    fs.mkdirSync("./../../api")
    fs.mkdirSync("./../../api/models")
    fs.mkdirSync("./../../api/controllers")
    fs.mkdirSync("./../../config")

    var configMiddlewareTemplate =
        `module.exports = {
	    _idtoid : true,
	    defaultLimit : 50
	}`
    fs.writeFileSync("./../../config/middlewares.js", configMiddlewareTemplate)

    var corsTemplate = `module.exports = {
	    origin : ["http://localhost:1337"],
	    exposedHeaders: ['X-Authorization-Token']
	}`

    fs.writeFileSync("./../../config/cors.js", corsTemplate)

    var configACLTemplate = `
module.exports = {
    "unauthenticated": {
                            "User" : {
                                find : true,
                                findOne : true,
                                create : true,
                                update : true,
                                destroy : true,
                            },
                        }
}`
    fs.writeFileSync("./../../config/acl.js", configACLTemplate)

    var configMongoConnectionTemplate = `
module.exports = {
    url : "mongodb://localhost:27017/chatwire"
}`
    fs.writeFileSync("./../../config/mongoconnection.js", configMongoConnectionTemplate)

    var configTokenTemplate = `
module.exports = {
    secret : "mySecret"
}`
    fs.writeFileSync("./../../config/token.js", configTokenTemplate)

    var userModelTemplate = `
var Schema = require('unito/node_modules/mongoose').Schema
var ObjectId = require('unito/node_modules/mongoose').Schema.Types.ObjectId
var config = require('./../../config/middlewares')

var UserSchema = new Schema(
    {
        "name" : {
            type : String
        },
        "testDate" : {
            type : Date
        }
    },
    {
        collection:"user",
        versionKey: false,
        timestamps:true,
    }
)
module.exports = UserSchema`
    fs.writeFileSync("./../../api/models/User.js", userModelTemplate)


    var userControllerTemplate = `
var blueprints = require("unito/middlewares/blueprints")()
var Token = require("unito/services/token")
var Api = require("unito/api")

module.exports = {
    find : blueprints.find(),
	findOne : blueprints.findOne(),
    create : blueprints.create(),
	update : blueprints.update(),
	destroy : blueprints.destroy(),
}`
    fs.writeFileSync("./../../api/controllers/UserController.js", userControllerTemplate)

    var appTemplate = `
    var app = require('unito')
    module.exports = app
`
    fs.writeFileSync("./../../app.js", appTemplate)
}
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var fs = require("fs")

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
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
fs.unlinkSync("./../../app.js")
fs.mkdirSync("./../../api")
fs.mkdirSync("./../../api/models")
fs.mkdirSync("./../../api/controllers")
fs.mkdirSync("./../../config")

var configMiddlewareTemplate = `
module.exports = {
    _idtoid : true,
    defaultLimit : 50
}`
fs.writeFileSync("./../../config/middlewares.js",configMiddlewareTemplate)

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
fs.writeFileSync("./../../config/acl.js",configACLTemplate)

var configMongoConnectionTemplate = `
module.exports = {
    url : "mongodb://localhost:27017/chatwire"
}`
fs.writeFileSync("./../../config/mongoconnection.js",configMongoConnectionTemplate)

var configTokenTemplate = `
module.exports = {
    secret : "mySecret"
}`
fs.writeFileSync("./../../config/token.js",configTokenTemplate)

var userModelTemplate = `
var Schema = require('unito/node_modules/mongoose').Schema
var ObjectId = require('unito/node_modules/mongoose').Schema.Types.ObjectId
var config = require('./../../config/middlewares')

var UserSchema = new Schema(
    {
        "name" : {
            type : String
        }
    },
    {
        collection:"user",
        versionKey: false,
        timestamps:true,
    }
)
module.exports = UserSchema`
fs.writeFileSync("./../../api/models/User.js",userModelTemplate)


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
fs.writeFileSync("./../../api/controllers/UserController.js",userControllerTemplate)

var appTemplate = `
    var app = require('unito'),http_instance;
    module.exports = app.listen(3000)
`
fs.writeFileSync("./../../app.js",appTemplate)

var UserSchema = require('./../../../api/models/User')
var User = mongoose.model('user', UserSchema);
var server = require('../../../app');
chai.use(chaiHttp);
describe('Testing blueprints', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
            done();         
        });    
    });
    describe('Testing blueprints', () => {

        it('Get users', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });

        it('Create a user', (done) => {
            let data = {"name":"Niteen Autade"} 
            chai.request(server)
                .post('/user')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql(data.name)
                    done();
            });
        });

        it('Create and Get User', (done) => {
            let data = {"name":"Niteen Autade"} 
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].name.should.be.eql("Niteen Autade");
                done();
            });
        });
    })

    after(function(done) {
        mongoose.disconnect();
        done();
    });
    
})

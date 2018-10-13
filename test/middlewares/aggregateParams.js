var clearRequire = require('clear-require');
clearRequire.all()
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

if (fs.existsSync("./../../app.js")) {
    fs.unlinkSync("./../../app.js")
}
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

var corsTemplate = `module.exports = {
    origin : ["http://localhost:1337"],
    exposedHeaders: ['X-Authorization-Token']
}`

fs.writeFileSync("./../../config/cors.js",corsTemplate)


var configACLTemplate = `
module.exports = {
    "unauthenticated": {
        "Test" : {
            find : true,
            findOne : true,
            create : true,
            update : true,
            destroy : true,
            testSub : true
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

var testModelTemplate = `
var Schema = require('unito/node_modules/mongoose').Schema
var ObjectId = require('unito/node_modules/mongoose').Schema.Types.ObjectId
var config = require('./../../config/middlewares')

var TestSchema = new Schema(
    {
        "name" : {
            type : String
        },
        "testDate" : {
            type : Date
        }
    },
    {
        collection:"test",
        versionKey: false,
        timestamps:true,
    }
)
module.exports = TestSchema`
fs.writeFileSync("./../../api/models/Test.js",testModelTemplate)


var testControllerTemplate = `
var blueprints = require("unito/middlewares/blueprints")()
var Token = require("unito/services/token")
var Api = require("unito/api")

module.exports = {
    find : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }],
	findOne : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }],
    create : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }],
	update : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }],
	destroy : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }],
    testSub : [
        function(req,res,next){
            var reqParams = req.Params
            return res.json(reqParams)
        }], 
}`
fs.writeFileSync("./../../api/controllers/TestController.js",testControllerTemplate)

var appTemplate = `
var app = require('unito')
module.exports = app
`
fs.writeFileSync("./../../app.js",appTemplate)

var TestSchema = require('./../../../../api/models/Test')
var Test = mongoose.model('test', TestSchema);
var server = require('../../../../app');

chai.use(chaiHttp);
describe('Testing middlewares - aggregateParams', () => {
    it('aggregateParams GET find', (done) => {
        chai.request(server)
        .get('/test?abc=1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            done();
        });
    })
    it('aggregateParams GET findone', (done) => {
        chai.request(server)
        .get('/test/abc?abc=1&where={"lmn":33,"aa":"bb"}')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            res.body.where.should.have.property("lmn").equal(33)
            res.body.where.should.have.property("aa").equal("bb")
            done();
        });
    })
    it('aggregateParams POST', (done) => {
        chai.request(server)
        .post('/test?abc=1&where={"lmn":33,"aa":"bb"}')
        .send({"xyz":1})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            res.body.should.have.property("xyz").equal(1)
            res.body.where.should.have.property("lmn").equal(33)
            res.body.where.should.have.property("aa").equal("bb")
            done();
        });
    })
    it('aggregateParams PUT', (done) => {
        chai.request(server)
        .put('/test/5b41b4804286862c33d11b3f?abc=1&where={"lmn":33,"aa":"bb"}')
        .send({xyz:1})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            res.body.should.have.property("xyz").equal(1)
            res.body.where.should.have.property("lmn").equal(33)
            res.body.where.should.have.property("aa").equal("bb")
            done();
        });
    })
    it('aggregateParams Delete', (done) => {
        chai.request(server)
        .delete('/test/5b41b4804286862c33d11b3f?abc=1&where={"lmn":33,"aa":"bb"}')
        .send({xyz:1})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            res.body.should.have.property("xyz").equal(1)
            res.body.where.should.have.property("lmn").equal(33)
            res.body.where.should.have.property("aa").equal("bb")
            done();
        });
    })
    it('aggregateParams subroute', (done) => {
        chai.request(server)
        .post('/test/testSub?abc=1&where={"lmn":33,"aa":"bb"}')
        .send({xyz:1})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("abc").equal(1)
            res.body.should.have.property("xyz").equal(1)
            res.body.where.should.have.property("lmn").equal(33)
            res.body.where.should.have.property("aa").equal("bb")
            done();
        });
    })
    after(function(done) {
        mongoose.disconnect();
        done();         
    });
})
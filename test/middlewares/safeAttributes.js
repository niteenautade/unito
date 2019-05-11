var clearRequire = require('clear-require');
clearRequire.all()
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var fs = require("fs")

require("./../init/")()
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

var userModelTemplate = `
var Schema = require('unito/node_modules/mongoose').Schema
var ObjectId = require('unito/node_modules/mongoose').Schema.Types.ObjectId
var config = require('./../../config/middlewares')

var UserSchema = new Schema(
    {
        "name" : {
            type : String
        },
        "testPar" : {
            type : String
        }
    },
    {
        collection:"user",
        versionKey: false,
        timestamps:true,
    }
)
UserSchema.statics.safeAttributes = {
    "unauthenticated":{
        "testPar":true
    }
}
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


var UserSchema = require('./../../../../api/models/User')
var User = mongoose.model('user', UserSchema);
var server = require('../../../../app');

chai.use(chaiHttp);
describe('Testing middlewares - safeAttributes', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.deleteMany({}, (err) => { 
            done();         
        });    
    });

    it('Create and Update User with a safeAttribute', (done) => {
        let olddata = {"name":"Niteen Autade","testPar":"oldVal"} 
        chai.request(server)
            .post('/user')
            .send(olddata)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.name.should.be.equal(olddata.name)
                res.body.testPar.should.be.equal(olddata.testPar)
                let newdata = {"testPar":"newVal"}
                return chai.request(server)
                .put('/user/'+res.body.id)
                .send(newdata)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.name.should.be.equal(olddata.name)
                    res.body.testPar.should.not.be.equal(newdata.testPar)
                done();
            });

        });
    });
    after(function(done) {
        mongoose.disconnect();
        done();         
    })
    
})
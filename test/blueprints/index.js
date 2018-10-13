var clearRequire = require('clear-require');
clearRequire.all()
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var fs = require("fs")

require("./../init")()

var UserSchema = require('./../../../../api/models/User')
var User = mongoose.model('user', UserSchema);
var server = require('../../../../app');

chai.use(chaiHttp);
describe('Testing blueprints', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
            done();         
        });    
    });
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
            .post('/user')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.name.should.be.eql(data.name)
                return chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].name.should.be.eql("Niteen Autade");
                done();
            });

        });
    });

    it('Edit a user', (done) => {
            let data = {"name":"Niteen Autade"}
            chai.request(server)
            .post('/user')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.name.should.be.eql("Niteen Autade");
                chai.expect(res.body).to.have.property("id")
                let updatedata = {"name":"Autade Niteen"}
                return chai.request(server)
                .put('/user/'+res.body.id)
                .send(updatedata)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql(updatedata.name)
                    done();
                });

        })
    });

    
    it('Delete a user', (done) => {
        let data = {"name":"Niteen Autade"}
        chai.request(server)
        .post('/user')
        .send(data)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.name.should.be.eql("Niteen Autade");
            chai.expect(res.body).to.have.property("id")
            return chai.request(server)
            .delete('/user/'+res.body.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });

        })
    });
    it('Check if posting date gets stored stored as date object in db', (done) => {

        let data = {"testDate":new Date().toISOString(),name:"abc"} 
        chai.request(server)
            .post('/user')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.testDate.should.be.eql(data.testDate)
                User.findOne({_id:res.body.id})
                .then(user=>{
                    user.testDate.should.be.a('date')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                    done()
                })
        });
    });
    
    it('id is received in response but stored as _id', (done) => {
        let data = {"name":"Niteen Autade"} 
        chai.request(server)
            .post('/user')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.name.should.be.eql(data.name)
                chai.expect(res.body).to.have.property("id")                
                User.findOne({_id:res.body.id})
                .then(user=>{
                    chai.expect(user).to.have.property("_id")
                    user._id.should.be.a('object')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                    done()
                })
            });
    });


    after(function(done) {
        mongoose.disconnect();
        done();         
    })
    
})
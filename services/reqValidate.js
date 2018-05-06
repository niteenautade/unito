var mongoose = require("mongoose")
var Schema = mongoose.Schema
module.exports = function(req){
    req.validate = function(schemaToTestAgainst){
        var TestSchema = new Schema(schemaToTestAgainst)
        var ReqValidateTestModel = mongoose.model('ReqValidateTestModel', TestSchema);

        var error = new ReqValidateTestModel({ ...req.Params }).validateSync()

        if(mongoose.connection.models['ReqValidateTestModel']){
            delete mongoose.connection.models['ReqValidateTestModel'];
        }
        
        if(error)
            throw error
    }

}
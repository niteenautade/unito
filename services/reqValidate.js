var mongoose = require("mongoose")
var Schema = mongoose.Schema
module.exports = function(req){
    req.validate = function(schemaToTestAgainst,obj){
        var TestSchema = new Schema(schemaToTestAgainst)
        var ReqValidateTestModel = mongoose.model('ReqValidateTestModel', TestSchema);

        var objToTest = !obj ? req.Params : obj
        var error = new ReqValidateTestModel({ ...objToTest }).validateSync()

        if(mongoose.connection.models['ReqValidateTestModel']){
            delete mongoose.connection.models['ReqValidateTestModel'];
        }
        
        if(error)
            throw error
    }

}
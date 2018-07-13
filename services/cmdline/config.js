module.exports = function(){
    var config = {
        "model" : {
            "template" : "./templates/model",
            "output" : "./api/models/",
            "suffix" : ".js"
        },
        "controller" : {
            "template" : "./templates/controller",
            "output" : "./controllers/",
            "suffix" : "Controller.js"
        }
    }
    return config
}
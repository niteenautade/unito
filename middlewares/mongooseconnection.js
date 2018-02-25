module.exports = function(mongoose){
    var configpath = require("path").resolve('./config/mongoconnection.js')
    var config = require(configpath)
    mongoose.connect(config.url)
    return mongoose;
}
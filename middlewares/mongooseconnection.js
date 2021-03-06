var findUp = require("find-up")
module.exports = function(mongoose){
    var configpath = findUp.sync('./config/mongoconnection.js')
    var config = require(configpath)
    mongoose.connect(config.url,{ useNewUrlParser: true, useUnifiedTopology:true })
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
}
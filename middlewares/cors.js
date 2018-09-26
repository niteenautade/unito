var cors = require('cors')
var findUp = require("find-up")
var corsConfigPath = findUp.sync('./config/cors.js')
var corsConfig = require(corsConfigPath)

if(corsConfig){
	console.log(corsConfig)
	
}
module.exports = cors(corsConfig)
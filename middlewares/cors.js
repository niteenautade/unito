var cors = require('cors')
var findUp = require("find-up")
var corsConfigPath = findUp.sync('./config/cors.js')
var corsConfig = require(corsConfigPath)

module.exports = (app) => {
	app.use(cors(corsConfig));
}
var cors = require('cors')
var findUp = require("find-up")
var corsConfigPath = findUp.sync('./config/cors.js')
var corsConfig = require(corsConfigPath)

var whitelist = !corsConfig ? [] : corsConfig.whitelist
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(corsOptions)
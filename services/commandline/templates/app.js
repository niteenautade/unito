module.exports = function(){
    var template =
`'use strict';
try {
	const { init, Token } = require("unito")
	const app = init()
	const port = 3000
	app.listen(port, () => {
		console.log(\`Example app listening at http://localhost:\${port}\`)
	})
} catch (error) {
	console.log(error)
}`
    return template
}


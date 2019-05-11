module.exports = function(error,req,res,next){
	console.log(new Date().toISOString()+"  :  ",error)
	console.log(JSON.stringify(error,null,4))
	if(error.hasOwnProperty("status")){
		return res.status(error.status).json(error)
	}
	else if(error.name == "ValidationError"){
		return res.status(400).json(error)
	}
	else{
		return res.status(500).json(error)
	}
}
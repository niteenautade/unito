module.exports = function(error,req,res,next){
	console.log(new Date().toISOString()+"  :  ",error)
	if(error.hasOwnProperty("status")){
		return res.status(error.status).json(error)
	}
	else{
		return res.status(500).json(error)
	}
}
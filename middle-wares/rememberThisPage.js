
module.exports = function(req, res, next){
	res.cookie("previous_page", req.originalUrl);
	next();
}
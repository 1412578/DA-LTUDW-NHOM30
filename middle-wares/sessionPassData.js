module.exports = function(req,res,next){
	if (req.session){
		res.locals.username = req.session.username;
		res.locals.name = req.session.name;
	}
	next();
}
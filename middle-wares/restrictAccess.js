module.exports = {
	"user": function(req,res,next){
		if ((req.session)&&(req.session.username)){
			next();	
		}
		else
			res.redirect("/user/new");
	},
	"guest": function(req,res,next){
		if ((!req.session)||(!req.session.username)){
			next();	
		}
		else
			res.redirect("/");
	}
}
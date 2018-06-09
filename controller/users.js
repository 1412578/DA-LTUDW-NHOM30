var express = require('express');
var userRepo = require('../repos/userRepo');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function show(req, res, next){
	res.render("user", {layout: "layout_no_sidebar", msg: req.query.msg});
}

function create(req, res, next){
	var user = {};
	userRepo.check(req.body.username).then(rows=>{
		if (rows.length == 0){
			user = {
				"username": req.body.username,
				"password": req.body.password,
				"role": "customer",
				"email": req.body.email,
				"name": req.body.name,
				"address": req.body.address,
				"gender": req.body.gender,
				"birthday": req.body.birthday,
				"phone": req.body.phone
			};
			return bcrypt.hash(user.password, saltRounds);
		}
		else
			throw new Error('Username đã tồn tại');
	})
	.then(hash=>{
		user.password = hash;
		return userRepo.add(user);
	})
	.then(value=>{
		res.redirect("/");
	})
	.catch(error=>{
		res.redirect("/user/new?msg="+error);
	});
	
}

module.exports =  {"show": show, "create": create}


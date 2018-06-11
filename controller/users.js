var express = require('express');
var userRepo = require('../repos/userRepo');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function show(req, res, next){
	res.render("user", {layout: "layout_no_sidebar", msg: req.query.msg});
}

function create(req, res, next){
	var user = {};
	var fields = ["username", "password", "email", "name", "address", "gender", "birthday", "phone"];

	// Kiểm tra có field nào rỗng không
	var missingField = fields.find(requiredField=> !req.body[requiredField]);
	if (missingField){
		res.redirect("/user/new?msg="+ missingField + " không được bỏ trống");
		return;
	}

	// Kiểm tra trùng username
	userRepo.check(req.body.username).then(rows=>{
		if (rows.length == 0){

			fields.forEach(field => user[field] = req.body[field])
			user.role = "customer";

			return bcrypt.hash(user.password, saltRounds);
		}
		else
			throw new Error('Username phải là duy nhất');
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


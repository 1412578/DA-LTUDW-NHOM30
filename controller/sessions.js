var express = require('express');
var bcrypt = require('bcrypt');
var userRepo = require('../repos/userRepo');
var applicationError = require('../fn/applicationError');
const saltRounds = 10;

function show(req, res, next){
	res.redirect("/");
}

function create(req, res, next){
	var user = {};
	var fields = ["username", "password"]
	if (fields.find(f=>!req.body[f]))
		res.redirect("/");
	else{
		fields.forEach(f => user[f] = req.body[f]);
		userRepo.findByUsername(user.username).then(rows=>{
			if (rows.length >0){
				user.name = rows[0].name;
				user.id = rows[0].id;
				return bcrypt.compare(user.password, rows[0].password);
			}
			else
				throw applicationError("INVALID_USERNAME_OR_PASSWORD");
			
		})
		.then(isVerified=>{
			if (isVerified==true){
				req.session.username = user.username;
				req.session.name = user.name;
				req.session.user_id = user.id;
				res.redirect("/");
			} else{
				throw applicationError("INVALID_USERNAME_OR_PASSWORD");
			}
		})
		.catch(error=>{
			next(error);
		});
	}
}

function remove(req, res, next){
	req.session.destroy(()=>{
		res.redirect("/");
	});
}

module.exports =  {"show": show, "create": create, "delete": remove}


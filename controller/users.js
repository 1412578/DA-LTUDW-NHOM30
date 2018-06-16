var express = require('express');
var userRepo = require('../repos/userRepo');
var bcrypt = require('bcrypt');
var moment = require('moment');
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
function info(req, res, next){
	var user = {};
	userRepo.load(req.session.username).then(rows=>{
		if (rows.length > 0){
			user = rows[0];
			user.birthday = moment(user.birthday).format("YYYY-MM-DD");
			res.render("user/profile", {layout: "layout_user", "user": user, "msg": req.query.msg});
		}
		else
			throw new Error("Tài khoản không tồn tại");
	}).catch(error=>{
		next(error);
	});
}
function update(req, res, next){
	var fields = ["name", "phone", "address", "email", "gender", "birthday"];
	var user = {};
	fields.forEach(field=> user[field] = req.body[field]);
	userRepo.check(req.session.username).then(rows=>{
		if (rows.length > 0){
			return userRepo.update(user);
		}
	})
	.then(value=>{
		res.redirect("/user/info?msg="+"Đã cập nhật thành công");
	})
	.catch(err=>{
		next(err);
	});
}

function cart(req, res, next){
	res.render("user/cart", {layout: "layout_user"});
}

function history(req, res, next){
	res.render("user/history", {layout: "layout_user"});
}

module.exports =  {"show": show, "create": create, "info": info, "cart": cart, "update": update, "history": history};


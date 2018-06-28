var express = require('express');
var userRepo = require('../repos/userRepo');
var cartRepo = require('../repos/cartRepo');
var orderRepo = require('../repos/orderRepo');
var applicationError = require('../fn/applicationError');
var bcrypt = require('bcrypt');
var moment = require('moment');
const saltRounds = 10;

function show(req, res, next){
	res.render("user", {layout: "layout_no_sidebar", msg: req.query.msg, csrfToken: req.csrfToken()});
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
			user = rows[0];
			user.birthday = moment(user.birthday).format("YYYY-MM-DD");
			res.render("user/profile", {layout: "layout_user", "user": user, "msg": req.query.msg, csrfToken: req.csrfToken()});
	
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
	cartRepo.load(req.session.username).then((rows)=>{
		res.locals.cart = rows;
		res.locals.cart.forEach(el=>el.totalprice = el.product_quantity * el.price);
		res.render("user/cart", {layout: "layout_user", "msg": req.query.msg, csrfToken: req.csrfToken()});
	})
	.catch(err=>{
		next(err);
	});
}

function cart_update(req, res, next){
	var cart = req.body.cart;
	if (cart == null)
		throw applicationError("CART_EMPTY");
	var updateCartPromises = [];
	cart.forEach(el=>{
		updateCartPromises.push(cartRepo.save(req.session.username, el.product_id, el.product_quantity));
	});
	Promise.all(updateCartPromises).then(values=>{
		res.redirect("/user/cart?msg=Đã cập nhật thành công");
	})
	.catch(err=>{
		next(err);
	});
}

function cart_create(req, res, next){
	let {product_id, product_quantity} = req.body;
	let user_id = req.session.user_id;
	cartRepo.checkCart(user_id, product_id).then(rows=>{
		if (rows.length <= 0)
			return cartRepo.addToCart(user_id, product_id, product_quantity);
		else
			return cartRepo.updateToCart(user_id, product_id, product_quantity);
	})
	.then(results=>{
		res.redirect(`/product/${product_id}`);
	})
	.catch(err=>next(err));
}

function cart_remove(req, res, next){
	let {product_id} = req.body;
	let user_id = req.session.user_id;
	cartRepo.checkCart(user_id, product_id).then(rows=>{
		if (rows.length > 0)
			return cartRepo.removeFromCart(user_id, product_id);
		else
			return Promise.reject("Something is broken");
	})
	.then(results=>{
		res.redirect(`/product/${product_id}`);
	})
	.catch(err=>next(err));
}

function history(req, res, next){
	let sortMode = "DESC";
	if (req.query.sort == "ASC")
		sortMode = "ASC";
	res.locals.sortMode = sortMode;
	orderRepo.getOrdersByUserId(req.session.user_id, {"sortMode": sortMode}).then(rows=>{
		res.locals.items = rows;
		rows.forEach(i=>i.order_datetime = i.order_datetime.toUTCString());
		res.render("user/history", {layout: "layout_user"});
	})
	.catch(err => next(err));
}

module.exports =  {
	"show": show, "create": create, "info": info, "cart": cart,
	"update": update, "history": history, "cart_update": cart_update,
	"cart_create": cart_create, "cart_remove": cart_remove
};


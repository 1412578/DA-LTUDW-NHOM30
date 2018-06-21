var express = require('express');
var debug = require('debug')('doan:server');
var applicationError = require('../fn/applicationError');
var userRepo = require('../repos/userRepo');
var cartRepo = require('../repos/cartRepo');
var orderRepo = require('../repos/orderRepo');
var productRepo = require('../repos/productRepo');
var orderDetailsRepo = require('../repos/orderDetailsRepo');
var moment = require('moment');

function newOrder(req, res, next){
	Promise.all([userRepo.load(req.session.username), cartRepo.load(req.session.username)]).then(results=>{
		if (results[1].length == 0)
			throw applicationError("CART_EMPTY");
		var userInfo = results[0][0];
		var cart = {"items": results[1], "totalCost": 0};
		cart.items.forEach(el=> el.totalPrice = el.product_quantity * el.price);
		cart.totalCost = cart.items.reduce((a,b) => a.totalPrice + b.totalPrice);
		res.locals.info = {};
		res.locals.info.buyer_name = userInfo.name;
		res.locals.info.receiver_name = userInfo.name;
		res.locals.info.receiver_address = userInfo.address;
		res.locals.info.receiver_phone = userInfo.phone;
		res.locals.info.receiver_email = userInfo.email;
		res.locals.info.cart = cart;

		res.render("order/new");
	})
	.catch(error=>{
		next(error);
	});

}

function createOrder(req, res, next){
	var order = {
		"id": 0,
		"receiver_name": req.body.receiver_name,
		"receiver_address": req.body.receiver_address,
		"receiver_phone": req.body.receiver_phone,
		"receiver_email": req.body.receiver_email,
		"user_id": req.session.user_id,
		"order_datetime": new moment.utc().format("YYYY-MM-DD HH-mm-ss"),
		"status": "CHECKOUT"
	};
	var cart = {};
	cartRepo.load(req.session.username).then(rows=>{
		if (rows.length == 0) 
			throw applicationError("CART_EMPTY");
		cart.items = rows;

		// Update inventory number of products in transaction
		var inventoryUpdates = [];
		cart.items.forEach(el=>{
			inventoryUpdates.push({
				"id": el.product_id,
				"inventory_number": el.inventory_number - el.product_quantity
			})
		});
		return productRepo.updateInventoryNumber(inventoryUpdates);
	})
	.then(()=>{
		debug("Check inventory successfully");
		// Create Order
		order.cost = cart.items.reduce((a,b) => a.product_quantity * a.price + b.product_quantity * b.price);
		return orderRepo.add(order);
	})
	.then(results=>{
		debug("Create order successfully");
		// Create Order Details
		order.id = results.insertId;
		var orderDetailsPromises = [];
		var orderDetails;
		cart.items.forEach(el=>{
			orderDetails = {
				"order_id": order.id,
				"product_id": el.product_id,
				"number": el.product_quantity
			}
			orderDetailsPromises.push(orderDetailsRepo.add(orderDetails));
		});
		return Promise.all(orderDetailsPromises);
	})
	.then(results=>{
		return cartRepo.deleteAll(req.session.user_id);
	})
	.then(results=>{
		res.redirect("/?msg=Đã tạo đơn hàng thành công");
	})
	.catch(err=>{
		next(err);
	});
}

module.exports =  {"newOrder": newOrder, "create": createOrder};


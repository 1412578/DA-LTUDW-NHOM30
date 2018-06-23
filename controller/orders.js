var express = require('express');
var debug = require('debug')('doan:server');
var applicationError = require('../fn/applicationError');
var userRepo = require('../repos/userRepo');
var cartRepo = require('../repos/cartRepo');
var orderRepo = require('../repos/orderRepo');
var productRepo = require('../repos/productRepo');
var orderDetailsRepo = require('../repos/orderDetailsRepo');
var db = require('../fn/db');
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

		res.render("order/new", {csrfToken: req.csrfToken()});
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
	var transaction = null;
	var cart = {items: null};
	
	cartRepo.load(req.session.username).then(rows=>{
		if (rows.length == 0) throw applicationError("CART_EMPTY");

		cart.items = rows;

		// Begin createOrder transaction
		debug("Begin transaction");
		transaction = new db.MyTransaction();
		return transaction.begin();
	})
	.then(()=>{
		debug("Create order");
		// Create Order
		order.cost = cart.items.reduce((a,b) => 
			a.product_quantity * a.price + b.product_quantity * b.price);

		return transaction.excute(orderRepo.add, order);
	})
	.then(results=>{
		debug("Create order details");
		// Create Order Details
		order.id = results.insertId;
		var orderDetailsPromises = [];
		var orderDetails = {};
		cart.items.forEach(el=>{
			orderDetails = {
				"order_id": order.id,
				"product_id": el.product_id,
				"number": el.product_quantity
			}
			orderDetailsPromises.push(transaction.excute(orderDetailsRepo.add, orderDetails));
		});
		return Promise.all(orderDetailsPromises);
	})
	.then(results=>{
		return transaction.excute(cartRepo.deleteAll, req.session.user_id);
	})
	.then(()=>{

		/* Update multi inventory number */
		var updateInventoryNumberWrapper = function(id, inventory_number){
			return function() {
				return productRepo.updateInventoryNumber.call(this, id, inventory_number);
			}
		};

		var updateList = 
			cart.items.map(item => ({ 
					"id": item.product_id,
					"inventory_number": item.inventory_number - item.product_quantity
				}));
		
		var seqPromises =
			updateList.map(el => updateInventoryNumberWrapper(el.id, el.inventory_number));

		return seqPromises.reduce((a,b) => a.then(()=>transaction.excute(b)), Promise.resolve());
	})
	.then(results=>{
		debug("Commit");
		return transaction.commit();
	})
	.then(results=>{
		res.redirect("/?msg=Đã tạo đơn hàng thành công");
	})
	.catch(err=>{
		debug("catch:" + err);
		transaction.rollback(()=>{
			debug("rollback");
			next(err);
		});
	});
}

module.exports =  {"newOrder": newOrder, "create": createOrder};


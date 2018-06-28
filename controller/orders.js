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
		if (rows.length == 0) 
			throw applicationError("CART_EMPTY");
		cart.items = rows;
		let oversellItem = cart.items.find(item => item.inventory_number < item.product_quantity);
		if (oversellItem)
			throw applicationError("PRODUCT_QUANTITY_NEGATIVE", {"product_name": oversellItem.name});

		// Begin createOrder transaction
		transaction = new db.MyTransaction();
		return transaction.begin();
	})
	.catch(err=>{
		next(err);
	})
	.then(()=>{
		// Create Order
		order.cost = cart.items.reduce(
				(a,b) => a + b.product_quantity * b.price, 0 // calculate total cost of order
			) ;
		return transaction.excute(orderRepo.add, order);
	})
	.then(results=>{
		// Create Order Details
		order.id = results.insertId;

		var allOrderDetailsPromises = cart.items
			.map(cartItem=>({
				"order_id": order.id,
				"product_id": cartItem.product_id,
				"number": cartItem.product_quantity
			}))
			.map(orderDetailsItem => transaction.excute(orderDetailsRepo.add, orderDetailsItem));

		return Promise.all(allOrderDetailsPromises);
	})
	.then(results=>{
		return transaction.excute(cartRepo.deleteAll, req.session.user_id);
	})
	.then(()=>{

		/* Update multi inventory number */
		/* This wrapper create a closure for being able to be called without arguments in reduce */
		var updateInventoryWrapper = function(id, inventory_number){
			return function() {
				return productRepo.updateInventoryNumber.call(this, id, inventory_number);
			}
		};
		return cart.items
			.map(cartItem => ({ 
				"id": cartItem.product_id,
				"product_quantity": cartItem.product_quantity
			}))
			.map(updateParamsItem => updateInventoryWrapper(updateParamsItem.id, updateParamsItem.product_quantity))
			.reduce((wrapper1,wrapper2) => wrapper1.then(()=>transaction.excute(wrapper2)), Promise.resolve());

	})
	.then(results=>{
		return transaction.commit();
	})
	.then(results=>{
		res.redirect(req.cookies.previous_page || "/");
	})
	.catch(err=>{
		if (transaction){
			transaction.rollback(()=>{
				next(err);
			});
		}
	});
}

function showOrder(req, res, next){
	let order = {};
	orderRepo.checkOrderById(req.params.id, req.session.user_id).then(rows=>{
		if (rows <= 0) throw applicationError("DENY_VIEW_ORDER");
		return orderRepo.getOrderById(req.params.id);
	})
	.then(rows=>{
		order = rows[0];
		return orderDetailsRepo.getOrderDetailsByOrderId(order.id, {includeProduct: true});
	})
	.then(rows=>{
		order.items = rows;
		rows.forEach(item => item.totalPrice = item.price * item.number);
		res.render("order/show", {info: order});
	})
	.catch(err => next(err));
}

module.exports =  {"newOrder": newOrder, "create": createOrder, "show": showOrder};


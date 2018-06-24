var db = require('../fn/db');
var debug = require('debug')('doan:server');

exports.add = function addOrder(order){
	var sql = 	`insert into 
								\`orders\`(
										order_datetime, 
										status, 
										receiver_name, 
										receiver_address, 
										receiver_phone, 
										receiver_email, 
										cost, 
										user_id
									) 
								values(
									'${order.order_datetime}', 
									'${order.status}', 
									'${order.receiver_name}', 
									'${order.receiver_address}', 
									'${order.receiver_phone}', 
									'${order.receiver_email}', 
									'${order.cost}', 
									'${order.user_id}')`;
	return db.save(sql, this._connection);
}

exports.checkOrderById = function checkOrderById(id, user_id){
	let sql = `	SELECT id
				FROM orders
				WHERE user_id = ${user_id} AND id=${id}`;
	return db.load(sql);
}

exports.getOrderById = function getOrderById(id, options = {}){
	let sql = `	SELECT 	id, order_datetime, status, 
						receiver_name, receiver_address, 
						receiver_email, receiver_phone, cost, user_id
				FROM orders
				WHERE id = ${id}`;
	return db.load(sql);
}

exports.getOrdersByUserId = function getOrdersByUserId(userId, options = {}){
	let sortMode = options.sortMode == "ASC" ? "ASC" : "DESC";
	var sql = `	SELECT id, status, cost, order_datetime 
				FROM orders 
				WHERE user_id = ${userId} 
				ORDER BY order_datetime ${sortMode}`;
	return db.load(sql);
}
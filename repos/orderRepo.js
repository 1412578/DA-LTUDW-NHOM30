var db = require('../fn/db');
var debug = require('debug')('doan:server');

exports.add = function addOrder(order){
	var sql = 	`insert into 
								\`order\`(
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
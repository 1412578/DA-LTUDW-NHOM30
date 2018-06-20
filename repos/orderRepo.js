var db = require('../fn/db');

exports.add = order => {
	var sql = `insert into order(order_datetime, status, receiver_name, receiver_address, receiver_phone, receiver_email, cost) values('${order.order_datetime}', '${order.status}', '${order.receiver_name}', '${order.receiver_address}', '${order.receiver_phone}', '${order.receiver_email}', '${order.cost}')`;
	return db.save(sql);
}
var db = require('../fn/db');

exports.add = orderDetails => {
	var sql = `insert into order_details(order_id, product_id, number) values('${orderDetails.order_id}', '${orderDetails.product_id}', '${orderDetails.number}')`;
	return db.save(sql);
}
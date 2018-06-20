var db = require('../fn/db');

exports.add = user_order => {
	var sql = `insert into user_order(order_id, user_id) values('${user_order.order_id}', '${user_order.user_id}')`;
	return db.save(sql);
}
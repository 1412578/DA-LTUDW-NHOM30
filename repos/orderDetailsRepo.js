var db = require('../fn/db');


exports.add = function addOrderDetails(orderDetails) {
	var sql = `insert into order_details(order_id, product_id, number) values('${orderDetails.order_id}', '${orderDetails.product_id}', '${orderDetails.number}')`;
	return db.save(sql, this._connection);
}
exports.getOrderDetailsByOrderId = function getOrderDetailsByOrderId(id, options={}){
	let sql = `	SELECT product_id, number
				FROM order_details
				WHERE order_id = ${id}`;
	let sqljoin = `	SELECT product_id, number, name, images, price
					FROM order_details 
					JOIN product ON order_details.product_id = product.id
					WHERE order_id = ${id}`;
	if (options.includeProduct)
		return db.load(sqljoin);
	else
		return db.load(sql);
}
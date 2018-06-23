var db = require('../fn/db');

exports.load = username => {
	var sql = `SELECT product_id, product.name, product.images, product.price, product.inventory_number, product_quantity 
			   FROM cart
			   JOIN user ON cart.user_id = user.id
			   JOIN product ON cart.product_id = product.id
			   WHERE user.username = '${username}'`;
	return db.load(sql);
}
exports.save = (username, product_id, product_quantity) => {
	var sql = `UPDATE cart 
				SET product_quantity = ${product_quantity}
				WHERE product_id = ${product_id} AND user_id = (SELECT id FROM user WHERE username = '${username}')`;
	return db.save(sql);
}
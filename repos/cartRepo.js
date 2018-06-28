var db = require('../fn/db');

exports.loadCart = function loadCart(user_id){
	var sql = `SELECT id
			   FROM cart
			   WHERE user_id = ${user_id}`;
	return db.load(sql);
}
exports.removeFromCart = function removeFromCart(user_id, product_id){
	var sql = `DELETE FROM cart
			   WHERE user_id = ${user_id} and product_id=${product_id}`;
	return db.save(sql);
}
exports.loadCartByProductId = function loadCartByProductId(user_id, product_id){
	var sql = `SELECT id, product_quantity
			   FROM cart
			   WHERE user_id = ${user_id} AND product_id = ${product_id}`;
	return db.load(sql);
}
exports.load = username => {
	var sql = `SELECT product_id, product.name, product.images, product.price, product.inventory_number, product_quantity, sold 
			   FROM cart
			   JOIN user ON cart.user_id = user.id
			   JOIN product ON cart.product_id = product.id
			   WHERE user.username = '${username}'`;
	return db.load(sql);
}
exports.save = function saveCart(username, product_id, product_quantity) {
	var sql = `UPDATE cart 
				SET product_quantity = ${product_quantity}
				WHERE product_id = ${product_id} AND user_id = (SELECT id FROM user WHERE username = '${username}')`;
	return db.save(sql, this._connection);
}
exports.deleteAll = function deleteAllCart(user_id){
	var sql = `DELETE FROM cart WHERE user_id = '${user_id}'`;
	return db.save(sql, this._connection);
}

exports.addToCart = function addToCart(user_id, product_id, product_quantity){
	var sql = `	INSERT INTO cart(
					user_id,
					product_id, 
					product_quantity)
				VALUES (${user_id}, ${product_id}, ${product_quantity})`;
	return db.save(sql);
}
exports.checkCart = function checkCart(user_id, product_id){
	var sql = ` SELECT id 
				FROM cart 
				WHERE user_id = ${user_id} AND product_id = ${product_id}`;
	return db.load(sql);
}
exports.updateToCart = function updateToCart(user_id, product_id, product_quantity) {
	var sql = `UPDATE cart 
				SET product_quantity = ${product_quantity}
				WHERE product_id = ${product_id} AND user_id = ${user_id}`;
	return db.save(sql);
}
var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.updateInventoryNumber = function(id, inventory_number){
	var sql = `UPDATE product 
				SET inventory_number = ${inventory_number}
				WHERE id = ${id}`;
	
	return db.save(sql, this._connection);
}
exports.getInventoryNumber = function(id){
	var sql = `SELECT inventory_number 
				FROM product WHERE id = '${id}'`;
	
	return db.load(sql);
}
exports.getProductById = function(id){
	let sql = `	SELECT name, images, 
					price, description,
					origin, category, 
					maker, inventory_number, datetime, 
					sold, view, category_id, vendor_id
				FROM product WHERE id = ${id}`;
	return db.load(sql);
}
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
	let sql = `	SELECT id, name, images, 
					price, description,
					origin, category, 
					maker, inventory_number, datetime, 
					sold, view, category_id, vendor_id
				FROM product WHERE id = ${id}`;
	return db.load(sql);
}
exports.getProductByCategoryId = function getProductByCategoryId(id, category_id, options={}){
	let sql = `	SELECT id, name, images, price
				FROM product
				WHERE category_id = ${category_id} AND id != ${id}`;
	if (options.limit)
		sql += ` LIMIT ${options.limit}`;
	return db.load(sql);
}
exports.getProductByVendorId = function getProductByVendorId(id, vendor_id, options={}){
	let sql = `	SELECT id, name, images, price
				FROM product
				WHERE vendor_id = ${vendor_id} AND id != ${id}`;
	if (options.limit)
		sql += ` LIMIT ${options.limit}`;
	return db.load(sql);
}
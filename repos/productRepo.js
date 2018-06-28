var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.updateInventoryNumber = function(id, product_quantity){
	var sql = `UPDATE product 
				SET inventory_number = inventory_number - ${product_quantity}, sold = sold + ${product_quantity}
				WHERE id = ${id}`;
	
	return db.save(sql, this._connection);
}
exports.updateSoldProduct = function(id, sold){
	var sql = `UPDATE product 
				SET sold = ${sold}
				WHERE id = ${id}`;
	
	return db.save(sql, this._connection);
}
exports.getInventoryNumber = function(id){
	var sql = `SELECT inventory_number 
				FROM product WHERE id = '${id}'`;
	
	return db.load(sql);
}

exports.limitNewestProduct = function(limit){
	var sql = `	SELECT product.id, name, images, price, vendor_name, category_name
				FROM product 
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				ORDER BY datetime DESC LIMIT ${limit}`;
	return db.load(sql);
}

exports.limitMostSoldProduct = function(limit){
	var sql = `	SELECT product.id, name, images, price, vendor_name, category_name 
				FROM product
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				ORDER BY sold DESC LIMIT ${limit}`;
	return db.load(sql);
}

exports.limitMostViewProduct = function(limit){
	var sql = `	SELECT product.id, name, images, price, vendor_name, category_name 
				FROM product
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				ORDER BY view DESC LIMIT ${limit}`;
	return db.load(sql);
}

exports.getProductById = function(id){
	let sql = `	SELECT id, name, images, 
					price, description,
					origin, category, 
					maker, inventory_number, datetime, 
					sold, view, category_id, vendor_id, sold
				FROM product WHERE id = ${id}`;
	return db.load(sql);
}
exports.getProductByCategoryId = function getProductByCategoryId(category_id, options={}){
	let sql = `	SELECT product.id, name, images, price, vendor_name, category_name
				FROM product
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				WHERE category_id = ${category_id}`;
	if (options.limit)
		sql += ` LIMIT ${options.limit}`;
	return db.load(sql);
}
exports.getProductByVendorId = function getProductByVendorId(vendor_id, options={}){
	let sql = `	SELECT product.id, name, images, price, vendor_name, category_name
				FROM product
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				WHERE vendor_id = ${vendor_id}`;
	if (options.limit)
		sql += ` LIMIT ${options.limit}`;
	return db.load(sql);
}

exports.getProductByFirstNamePrefix = function getProductByFirstNamePrefix(name){
	let sql = `	SELECT id, name, images, price
				FROM product
				WHERE name LIKE '${name}%'`;
	return db.load(sql);
}


exports.getProductByFilter = function getProductByFilter(filters){
	let sql = `	SELECT product.id, name, images, price, vendor_name, category_name
				FROM product 
				JOIN vendor ON product.vendor_id = vendor.id
				JOIN category ON product.category_id = category.id
				WHERE 1`;
	sql = filters.reduce((a,b)=>a.concat(b), sql) + ` ORDER BY PRICE DESC`;
	console.log(sql);
	return db.load(sql);
}

exports.getFilterByCategories = function getFilterByCategories(ids){
	if (ids)
		return ids.reduce((a,b)=>a.concat(` OR category_id = ${b}`), " AND (0 ") + ")";
	return "";
}

exports.getFilterByVendors = function getFilterByVendors(ids){
	if (ids)
		return ids.reduce((a,b)=>a.concat(` OR vendor_id = ${b}`), " AND (0") + ")";
	return "";
}

exports.getFilterByPrice = function getFilterByPrice(range){
	let sql = ``;
	if (range){
		if (range.from)
			sql += ` AND price >= ${range.from}`;
		if (range.to)
			sql += ` AND price <= ${range.to}`;
	}
	return sql;
}
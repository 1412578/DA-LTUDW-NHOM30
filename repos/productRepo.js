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

exports.limitNewestProduct = function(limit){
	var sql = `	SELECT id, name, images, price 
				FROM product ORDER BY datetime DESC LIMIT ${limit}`;
	return db.load(sql);
}

exports.limitMostSoldProduct = function(limit){
	var sql = `	SELECT id, name, images, price 
				FROM product ORDER BY sold DESC LIMIT ${limit}`;
	return db.load(sql);
}

exports.limitMostViewProduct = function(limit){
	var sql = `	SELECT id, name, images, price 
				FROM product ORDER BY view DESC LIMIT ${limit}`;
	return db.load(sql);
}
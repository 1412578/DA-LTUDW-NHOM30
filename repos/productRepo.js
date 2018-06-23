var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.updateInventoryNumber = function(id, inventory_number){
	var sql = `UPDATE product 
				SET inventory_number = ${inventory_number}
				WHERE id = ${id}`;
	
	return db.save(sql, this._connection);
}
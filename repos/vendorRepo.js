var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.loadVendorById = function loadVendorById(id){
	var sql = `SELECT id, vendor_name FROM vendor WHERE id = ${id}`;
	return db.load(sql);
}

exports.loadVendors = function loadVendors(){
	var sql = `SELECT id, vendor_name FROM vendor`;
	return db.load(sql);
}

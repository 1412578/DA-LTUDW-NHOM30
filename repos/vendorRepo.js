var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.loadVendorById = function loadVendorById(id){
	var sql = `SELECT vendor_name FROM vendor WHERE id = ${id}`;
	return db.load(sql);
}
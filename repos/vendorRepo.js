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

exports.getAllVendors = function(){
    var sql = "select * from vendor";
    return db.load(sql);
}

exports.deleteById = function(vendor_id){
    var sql = `DELETE FROM vendor where id = ${vendor_id}`;
    return db.save(sql);
}

exports.insert = function(vendor_name){
    var sql = `insert into vendor(vendor_name) values ('${vendor_name}')`;
    console.log(sql);
    return db.save(sql);
}
var mysql = require('mysql');
var db = require('../fn/db');
var config = require('../config/config');


exports.loadCategoryById = function loadCategoryById(id){
	var sql = `SELECT id, category_name FROM category WHERE id = ${id}`;
	return db.load(sql);
}
exports.loadCategories = function loadCategories(){
	var sql = `SELECT id, category_name FROM category`;
	return db.load(sql);
}
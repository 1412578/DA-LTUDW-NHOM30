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
exports.insert = function(category_name){
    var sql = `insert into category (category_name) values ('${category_name}')`;
    return db.save(sql);
}

exports.deleteById = function(category_id){
    var sql = `delete from category where id = ` + category_id;
    return db.save(sql);
}

exports.load = function(){
    var sql = `select * from category`;
    return db.save(sql);
}

exports.update = function(category_id, category_name){
    var sql = `update category set category_name = '${category_name}' where id = ${category_id}`;
    return db.save(sql);
}
var express = require('express');
var categoryRepo = require('../repos/categoryRepo');
var productRepo = require('../repos/productRepo');
var applicationError = require('../fn/applicationError');

function show(req, res, next){
	categoryRepo.loadCategoryById(req.params.id).then(rows=>{
		if (rows.length < 0)
			throw applicationError("RESOURCE_NOT_EXIST");
		res.locals.header = rows[0].category_name;
		res.locals.categoryId = rows[0].id;
		res.locals.vendorAll = true;
		return productRepo.getProductByCategoryId(rows[0].id);
	})
	.then(rows=>{
		res.locals.products = rows;
		res.render("product/list");
	})
	.catch(err=>{
		next(err);
	});
}

module.exports =  {"show": show};


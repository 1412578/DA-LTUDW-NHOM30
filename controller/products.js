var express = require('express');
var applicationError = require('../fn/applicationError');
var productRepo = require('../repos/productRepo');
var vendorRepo = require('../repos/vendorRepo');
var categoryRepo = require('../repos/categoryRepo');

function show(req, res, next){
	productRepo.getProductById(req.params.id).then(rows=>{
		if (rows <= 0) throw applicationError("PRODUCT_NOT_EXIST");
		res.locals.product = rows[0];
		return Promise.all([
			categoryRepo.loadCategoryById(rows[0].category_id),
			vendorRepo.loadVendorById(rows[0].vendor_id),
			productRepo.getProductByCategoryId(rows[0].id, rows[0].category_id, {limit: 5}),
			productRepo.getProductByVendorId(rows[0].id, rows[0].vendor_id, {limit: 5})]);
	})
	.then(results=>{
		res.locals.product.category_name = results[0][0].category_name;
		res.locals.product.vendor_name = results[1][0].vendor_name;
		res.locals.product.sameCategory = results[2];
		res.locals.product.sameVendor = results[3];
		res.render("product/show", {csrfToken: req.csrfToken()});
	})
	.catch(err => next(err));
}

module.exports =  {"show": show};


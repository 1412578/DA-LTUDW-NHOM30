var express = require('express');
var vendorRepo = require('../repos/vendorRepo');
var productRepo = require('../repos/productRepo');
var applicationError = require('../fn/applicationError');

function show(req, res, next){
	vendorRepo.loadVendorById(req.params.id).then(rows=>{
		if (rows.length < 0)
			throw applicationError("RESOURCE_NOT_EXIST");
		res.locals.header = rows[0].vendor_name;
		res.locals.vendorId = rows[0].id;
		res.locals.categoryAll = true;
		return productRepo.getProductByVendorId(rows[0].id);
	})
	.then(rows=>{
		res.locals.products = rows;
		res.render("product/list", {csrfToken: req.csrfToken()});
	})
	.catch(err=>{
		next(err);
	});
}
module.exports =  {"show": show};


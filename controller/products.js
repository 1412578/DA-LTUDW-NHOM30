var express = require('express');
var applicationError = require('../fn/applicationError');
var productRepo = require('../repos/productRepo');
var vendorRepo = require('../repos/vendorRepo');
var categoryRepo = require('../repos/categoryRepo');
var cartRepo = require('../repos/cartRepo');

function layouts(req, res, next){
	let allPromise = [categoryRepo.loadCategories(), vendorRepo.loadVendors()];
	if (req.session.user_id){
		allPromise.push(cartRepo.loadCart(req.session.user_id));
		console.log(req.session.user_id);
	}
	Promise.all(allPromise).then(results=>{
		res.locals.menu = {};
		res.locals.menu.categories = results[0];
		res.locals.menu.vendors = results[1];
		if (results[2])
			res.locals.menu.cart = results[2].length;
		next();
	}).catch(err=>{
		console.log(err);
	});
}
function show(req, res, next){
	productRepo.getProductById(req.params.id).then(rows=>{
		if (rows <= 0) throw applicationError("PRODUCT_NOT_EXIST");
		res.locals.product = rows[0];
		var promiseAll = [categoryRepo.loadCategoryById(rows[0].category_id),
			vendorRepo.loadVendorById(rows[0].vendor_id),
			productRepo.getProductByCategoryId(rows[0].category_id, {limit: 5}),
			productRepo.getProductByVendorId(rows[0].vendor_id, {limit: 5})];
		if (req.session.user_id)
			promiseAll.push(cartRepo.loadCartByProductId(req.session.user_id, rows[0].id));
		return Promise.all(promiseAll);
			
	})
	.then(results=>{
		res.locals.product.category_name = results[0][0].category_name;
		res.locals.product.vendor_name = results[1][0].vendor_name;
		res.locals.product.sameCategory = results[2];
		res.locals.product.sameVendor = results[3];
		var product = results[4];
		if (product){
			if (product.length > 0){
				res.locals.product.numInCart = product[0].product_quantity;
				res.locals.product.inCart = true;
			}
			else{
				res.locals.product.numInCart = 0;
				res.locals.product.inCart = false;
			}
		}
		res.render("product/show", {csrfToken: req.csrfToken()});
	})
	.catch(err => next(err));
}
function searchByPrefix(req, res, next){
	productRepo.getProductByFirstNamePrefix(req.params.name).then(rows=>{
		res.json({items: rows});
	})
	.catch(err=>next(err));
}
function productList(req, res, next){
	productRepo.limitNewestProduct(20).then(rows=>{
		res.locals.products = rows;
		res.locals.categoryAll = true;
		res.locals.vendorAll = true;
		res.render("product/list", {header: "Tất cả sản phẩm"});
	}).catch(err=>next(err));
}

function productFilter(req, res, next){
	let {categories, vendors, range} = req.query;
	let priceFilter = productRepo.getFilterByPrice(range);
	let categoriesFilter = productRepo.getFilterByCategories(categories);
	let vendorsFilter = productRepo.getFilterByVendors(vendors);
	productRepo.getProductByFilter([priceFilter, categoriesFilter, vendorsFilter]).then(rows=>{
		res.json({items: rows});
	})
	.catch(err=>next(err));
}

module.exports =  {"show": show, "searchByPrefix": searchByPrefix, "list": productList, "filter": productFilter, "layouts": layouts};


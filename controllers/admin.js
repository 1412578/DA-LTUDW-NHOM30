var express = require('express');
var userRepo = require('../repos/userRepo');
var categoryRepo = require("../repos/categoryRepo");
var productRepo = require("../repos/productRepo");
var orderRepo = require("../repos/orderDetailsRepo");
var vendorRepo = require("../repos/vendorRepo");


function index(req, res, next){
	Promise.all([categoryRepo.load(), productRepo.getAllProducts(), orderRepo.getAllOrders(), vendorRepo.getAllVendors()]).then(function(results){
		var data = {
			categories : results[0],
			products: results[1],
			orders: results[2],
			vendors: results[3]
		}
		res.render("admin/index", {data : data});
	}).catch(function(err){
		next(err);
	});

}
function insertproduct(req, res, next){
	var datetime = new Date();
	var product = {
		name : req.body.product_name,
		category_id: req.body.category_id,
		images: req.body.images,
		description: req.body.description,
		origin: req.body.origin,
		inventory_number: req.body.inventory_number,
		price: req.body.price,
		category: req.body.category,
		datetime: datetime.getFullYear() + "-" + datetime.getMonth() + "-" + datetime.getDate(),
		vendor_id: req.body.vendor_id
	}
	productRepo.insert(product).then(function(results){
		res.status(200).json({err: false});
	}).catch(function(err){
		next(err);
	});
}
function deleteProductById(req, res, next){
	var productname = req.params.product_id;
	productRepo.deleteProductById(productname).then(function(results){
		res.json({status: 200});
	}).catch(function(err){
		next(err);
	});
}

function insertCategory(req, res, next){
	categoryRepo.insert(req.body.category_name).then(function(results){
		res.redirect("/admin");
	}).catch(function(err){
		next(err);
	});
}

function deleteCategoryById(req, res, next){
	categoryRepo.deleteById(req.params.category_id)
	.then(function(results){
		res.status(200).json({
			err: false
		})
	}).catch(function(err){
		next(err);
	});
}

function updateCategory(){

}


module.exports =  {
	"index": index,
	"insertproduct": insertproduct,
	"deleteProductById": deleteProductById,
	"insertCategory": insertCategory,
	"deleteCategoryById": deleteCategoryById,
	"updateCategory": updateCategory
};

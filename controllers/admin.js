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

module.exports =  {
	"index": index
};

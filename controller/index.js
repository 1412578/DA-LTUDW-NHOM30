var express = require('express');
var productRepo = require('../repos/productRepo');

/* GET home page. */
function index(req, res, next) {
	Promise.all([
		productRepo.limitNewestProduct(10), 
		productRepo.limitMostViewProduct(10),
		productRepo.limitMostSoldProduct(10)]).then(results=>{
			res.locals.items = {};
			res.locals.items.newest = results[0];
			res.locals.items.mostView = results[1];
			res.locals.items.mostSold = results[2];
			res.render('index', { title: 'Alcool'});
		})
		.catch(err=>next(err));
}

module.exports = { "index": index }

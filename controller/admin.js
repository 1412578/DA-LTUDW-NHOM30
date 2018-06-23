var express = require('express');
var userRepo = require('../repos/userRepo');
var db = require("../fn/db.js");


function index(req, res, next){
	var sql = "select * from product; select * from orders";
	var products = db.load(sql);
	if(products){
		products.then(function(results){
			var data= {
				products: results[0],
				orders: results[1]
			}
			for(var i =0; i < data.orders.length; i++){
				if(data.orders[i].status == 1){
					data.orders[i].status_name = "Đang Giao";
					data.orders[i].status_TT = "DangGiao warning";
				}
				if(data.orders[i].status == 2){
					data.orders[i].status_name = "Chưa Giao";
					data.orders[i].status_TT = "ChuaGiao success";
				}
				if(data.orders[i].status == 3){
					data.orders[i].status_name = "Đã Giao";
					data.orders[i].status_TT = "DaGiao info";
				}
			}
			console.log(data.orders);
			res.render("admin/index", {data});
		}).catch(function(errors){
			res.render("admin/index", {data: null});
		});
	}else{
		res.render("admin/index", {data: null});
	}


	//res.render("admin/index", {layout: null});
}

module.exports =  {"index": index};

var express = require('express');

function newOrder(req, res, next){
	res.render("order/new");
}

module.exports =  {"newOrder": newOrder};


var express = require('express');
var userRepo = require('../repos/userRepo');

function show(req, res, next){
	res.render("product/show");
}

module.exports =  {"show": show};


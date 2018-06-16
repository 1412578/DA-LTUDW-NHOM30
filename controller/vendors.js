var express = require('express');
var userRepo = require('../repos/userRepo');

function show(req, res, next){
	res.render("vendor/show");
}

module.exports =  {"show": show};


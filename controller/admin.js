var express = require('express');
var userRepo = require('../repos/userRepo');

function index(req, res, next){
	res.render("admin/index", {layout: null});
}

module.exports =  {"index": index};

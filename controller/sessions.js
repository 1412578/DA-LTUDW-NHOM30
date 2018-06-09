var express = require('express');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function show(req, res, next){
	res.redirect("/");
}

function create(req, res, next){
	res.redirect("/");	
}

function remove(req, res, next){
	res.redirect("/");
}

module.exports =  {"show": show, "create": create, "delete": remove}


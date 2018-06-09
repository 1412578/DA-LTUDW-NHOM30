var express = require('express');
var index = require("../controller/index");
var users = require("../controller/users");
var sessions = require("../controller/sessions");

module.exports = {
	"index": function(){
		var router = express.Router();

		router.get('/', index.index);

		return router;
	},
	"users": function(){
		var router = express.Router();

		router.get('/new', users.show);
		router.post('/create', users.create);
		
		return router;
	},
	"sessions": function(){
		var router = express.Router();

		router.get('/new', sessions.show);
		router.post('/create', sessions.create);
		router.post('/delete', sessions.delete);
		
		return router;
	}
}

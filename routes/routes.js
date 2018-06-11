var express = require('express');
var index = require("../controller/index");
var users = require("../controller/users");
var sessions = require("../controller/sessions");
var restrict = require('../middle-wares/restrictAccess');

module.exports = {
	"index": function(){
		var router = express.Router();

		router.get('/', index.index);

		return router;
	},
	"users": function(){
		var router = express.Router();

		router.get('/new', restrict.guest, users.show);
		router.post('/create', restrict.guest, users.create);
		
		return router;
	},
	"sessions": function(){
		var router = express.Router();

		router.post('/create', restrict.guest,  sessions.create);
		router.get('/delete', restrict.user, sessions.delete);
		
		return router;
	}
}

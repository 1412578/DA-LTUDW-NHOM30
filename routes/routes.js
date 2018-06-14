var express = require('express');
var index = require("../controller/index");
var users = require("../controller/users");
var products = require("../controller/products");
var sessions = require("../controller/sessions");
var categories = require("../controller/categories");
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
		router.get('/info', restrict.user, users.info);
		router.post('/update', restrict.user, users.update);
		router.get('/cart', restrict.user, users.cart);
		router.get('/history', restrict.user, users.history);
		
		return router;
	},
	"sessions": function(){
		var router = express.Router();

		router.post('/create', restrict.guest,  sessions.create);
		router.get('/delete', restrict.user, sessions.delete);

		return router;
	},
	"products": function(){
		var router = express.Router();

		router.get('/:id', products.show);

		return router;
	},
	"categories": function(){
		var router = express.Router();

		router.get('/:id', categories.show);

		return router;
	}
}

var express = require('express');
var index = require("../controller/index");
var users = require("../controller/users");
var products = require("../controller/products");
var sessions = require("../controller/sessions");
var categories = require("../controller/categories");
var vendors = require("../controller/vendors");
var admin = require("../controller/admin");
var orders = require("../controller/orders");
var csrf = require('csurf');
var restrict = require('../middle-wares/restrictAccess');
var csrfProtection = csrf();
module.exports = {
	"index": function(){
		var router = express.Router();

		router.get('/', index.index);

		return router;
	},
	"users": function(){
		var router = express.Router();

		router.use(csrfProtection);
		router.get('/new', restrict.guest, users.show);
		router.post('/create', restrict.guest, users.create);
		router.get('/info', restrict.user, users.info);
		router.post('/update', restrict.user, users.update);
		router.get('/cart', restrict.user, users.cart);
		router.post('/cart/update', restrict.user, users.cart_update);
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
	"orders": function(){
		var router = express.Router();

		router.use(csrfProtection);
		router.get('/new', orders.newOrder);
		router.get('/:id', orders.show);
		router.post('/create', orders.create);

		return router;
	},
	"categories": function(){
		var router = express.Router();

		router.get('/:id', categories.show);

		return router;
	},
	"vendors": function(){
		var router = express.Router();

		router.get('/:id', vendors.show);

		return router;
	},
	"admin": function(){
		var router = express.Router();

		router.get('/', admin.index);

		return router;
	}
}

var assert = require("assert");
var sinon = require("sinon");
var should = require("should");
var should = require("should-sinon");
var users = require("../controller/users.js");

describe("controller/users.js", function(){
	describe("show", function(){
		it ("Nên gọi res.render 'user' với layout = 'layout_no_sidebar', msg=string", function(){
			var res = {render: sinon.fake()};
			var req = {query:{ msg: sinon.fake()}};
			var next = sinon.fake();
			users.show(req, res);
			res.render.should.be.calledOnce();
			res.render.lastArg.layout.should.be.exactly("layout_no_sidebar");
			res.render.lastArg.msg.should.be.ok();
		});
	});
});
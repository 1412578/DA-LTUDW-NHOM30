var assert = require("assert");
var sinon = require("sinon");
var should = require("should");
var should = require("should-sinon");
var index = require("../controller/index.js");

describe("controller/index.js", function(){
	describe("index", function(){
		it ("Nên gọi res.render index tittle express", function(){
			var res = {render: sinon.fake()};
			var req = sinon.fake();
			var next = sinon.fake();
			index.index(req, res);
			res.render.should.be.calledOnce();
			res.render.lastCall.args.should.be.eql(["index", {title: "Express"}]);
		});
	});
});
var mysql = require('mysql');
var debug = require('debug')('doan:server');
var db = require('../fn/db');
var config = require('../config/config');

function queryPromise(sql, cn){
	function _queryPromise() {
		return new Promise(function __queryPromise(resolve, reject){
			cn.query(sql, function(err, value) {
			    if (err){
			        cn.rollback(function(){
			        	debug(sql);
			        	reject(err);	
			        });
			    }
			    else{
			    	resolve(value);
			    }
		 	});
		});
	}
	return _queryPromise;
}

exports.updateInventoryNumber = (inventoryUpdates) => {
	// Store multi query
	var sqls = [];
	inventoryUpdates.forEach(el=>{
		sqls.push(`UPDATE product 
				SET inventory_number = ${el.inventory_number}
				WHERE id = ${el.id}`);
	});

	return new Promise((resolve, reject) => {
			var cn = mysql.createConnection(config.db);
			var queryPromises = [];
			cn.connect();
			cn.beginTransaction(function(err){
	        	if (err) return reject(err);

	        	// Create sequence of promises
	        	sqls.forEach(el=>queryPromises.push(queryPromise(el, cn)));

	        	// Last promise of sequence for commit transaction
	        	queryPromises.push(function(){
	        		return new Promise((resolve, reject)=>{
	        		 	cn.commit(function(err){
		        		 	if (err)
				        		cn.rollback(() => reject(err));
				        	else{
					        	resolve();
				        	}
			        	});
	        		});
	        	});
	        	queryPromises.reduce((a,b)=> a.then(b), Promise.resolve())
	        	.then(()=>{
	        		cn.end();
	        		resolve();
	        		debug("End check inventory");
	        	})
	        	.catch(err=>{
	        		cn.end();
	        		reject(err);
	        	});
        });
    });
}
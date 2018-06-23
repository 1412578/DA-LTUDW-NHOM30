var mysql = require('mysql');
var config = require('../config/config');
var debug = require('debug')('doan:server');

exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection(config.db);

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
            	reject(error);
            } else {
            	resolve(rows);
            }

            cn.end();
        });
    });
}

/* If connection cn is undefined or null then create and close connection per query */
exports.save = (sql, cn) => {
    return new Promise((resolve, reject) => {
        var isTransactional = true;
        if (cn == null){
            cn = mysql.createConnection(config.db);
            cn.connect();
            isTransactional = false;
        }
        debug(isTransactional);
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            if (!isTransactional)
                cn.end();
        });
    });
}

function MyTransaction(){
    this._connection = null;
}
MyTransaction.prototype.begin = function(){
    return new Promise((resolve, reject)=>{
        this._connection = mysql.createConnection(config.db);
        this._connection.connect();
        this._connection.beginTransaction(function(err){
            if (err) reject(err);
            else resolve();
        });
    });
}

MyTransaction.prototype.excute = function(fn){
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    return fn.apply(this, args);
}

MyTransaction.prototype.rollback = function(fn){
    this._connection.rollback(fn);
}

MyTransaction.prototype.commit = function(){
    return new Promise((resolve, reject)=>{
        this._connection.commit(function(err){
            if (err) reject(err);
            else resolve();
        });
    });
}
exports.MyTransaction = MyTransaction;
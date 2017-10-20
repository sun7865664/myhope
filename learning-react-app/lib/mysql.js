var _ = require('lodash'),
    async = require('async'),
    mysql = require('mysql');

var logger = require("logger-node").getLogger();
var config = require("../config/mysql.js");

(function() {
    var Dao = {};
    var _config;
    var pool;
    // var pool = mysql.createPool(config);

    function connect(next) {

        logger.info('Database:', _config.host);
        pool = mysql.createPool(config);

        pool.on('error', console.error.bind(console, '连接错误:'));

        return next();
    }


    function disconnect(next) {
        pool.end(function(err) {
            // all connections in the pool have ended
        });
    }

    Dao.bootstrap = function(config, callback) {
        _config = config;
        callback = callback || function() {};

        async.series([
            connect
        ], function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    };

    Dao.close = function() {
        disconnect();
    };

    Dao.getConnection = function(cb) {
        return pool.getConnection(cb);
    };

    Dao.baseExcuteSql = function(sql, params, cb) {
        Dao.getConnection(function(err, connection) {
            connection.query(sql, params, function(error, rows) {
                connection.release();
                if (error) {
                    logger.error(error);
                    return cb(error);
                }
                return cb(null, rows);
            });
        });
    };

    module.exports = Dao;
}());

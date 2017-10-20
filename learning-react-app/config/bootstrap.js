var async = require("async");

module.exports = function(done) {

    'use strict';
    var config = require("../config");

    async.series([
        function(next) {
            var dao = require('../lib/mysql');
            return dao.bootstrap(config.db, next);
        },
        function(next) {
            var http = require('../lib/http');
            return http.bootstrap(config, next);
        },
        // function(next) {
        //     var timingtask = require('../timingtask');
        //     return timingtask.SaveAccessHistory.run(next);
        // }
    ], done);

};

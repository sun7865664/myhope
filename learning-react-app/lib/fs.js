'use strict';
const fs = require("fs");
var logger = require("logger-node").getLogger();

(function() {
    var fsAdapter = {};

    fsAdapter.writeFile = function(file, text, next) {
        fs.writeFile(file, text, 'utf8', (err) => {
            if (err) {
                return next(err);
            }
            return next();
    })
    };

    fsAdapter.appendFile = function(file, text, next) {
        fs.appendFile(file, text, 'utf8', (err) => {
            if (err) {
                return next(err);
            }
            return next();
    })
    };

    fsAdapter.readFile = function(file, next) {
        fs.readFile(file, 'utf8', next);
    };

    module.exports = fsAdapter;
})();

'use strict';

var async = require("async");
var config = require("./config");
var logger = require("logger-node").createLogger(config.logger);

async.series([
  function(next) {
    var bootstrap = require("./config/bootstrap");
    return bootstrap(next);
  },
  function(next) {
    var savePidToLocal = require("./lib/savePidToLocal");
    return savePidToLocal(next);
  }
], function(err, results) {
  logger.info('--------------------------------------------------------\n');
  if (err) {
    logger.error(err);
    setTimeout(process.exit, 1000);
  } else {
    logger.info("go http://localhost:" + config.local.port + "/");
    var c = require('child_process');
    c.exec("start http://localhost:" + config.local.port + "/");
  }

});

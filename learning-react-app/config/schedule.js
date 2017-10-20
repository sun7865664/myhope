var schedule = require("node-schedule");

(function() {
  var scheduleAdapter = {};

  scheduleAdapter.run = function(rule,job){
     schedule.scheduleJob(rule, job);
  };

  module.exports = scheduleAdapter;
})();

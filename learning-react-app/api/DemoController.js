var logger = require("logger-node").getLogger();

(function() {
  var DemoController = {};
  DemoController.index = function(req, res) {
    return res.render("index");
  };
  module.exports = DemoController;
})();

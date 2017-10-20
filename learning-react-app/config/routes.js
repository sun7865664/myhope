'use strict';
const DemoController = require("../api/DemoController");

module.exports = {
    "get /": DemoController.index
};

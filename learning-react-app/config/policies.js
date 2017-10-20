const sessionAuth = require('../policies/sessionAuth');

module.exports = {
  '/':sessionAuth
};

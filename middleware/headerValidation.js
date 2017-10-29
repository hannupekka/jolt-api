const _ = require('lodash');
const assert = require('../validation/index');

const validateHeaders = (req, res, next) => {
  assert(_.get(req, 'headers.remote-user'), 'common.user');
  next();
};

module.exports = validateHeaders;

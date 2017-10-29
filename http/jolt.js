const _ = require('lodash');
const { createJsonRoute } = require('../utils/express');
const assert = require('../validation/index');
const joltCore = require('../core/jolt');

const getJolts = createJsonRoute(() => joltCore.getJolts());

const giveJolt = createJsonRoute(req => {
  const body = assert(_.get(req, 'body'), 'jolt');
  const givenBy = _.get(req, 'headers.remote-user');
  const givenTo = _.get(body, 'givenTo');

  const jolt = _.merge({}, { givenBy }, _.omit(body, 'givenTo'));

  return joltCore.giveJolt(jolt, givenTo);
});

module.exports = {
  getJolts,
  giveJolt,
};

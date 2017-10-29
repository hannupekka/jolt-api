const express = require('express');
const RateLimit = require('express-rate-limit');
const userHttp = require('../http/user');
const joltHttp = require('../http/jolt');

function createRouter() {
  const router = express.Router();

  // Rate limiter.
  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  });
  router.use(limiter);

  // Routes.

  // Users.
  router.get('/user', userHttp.getUsers);

  // Jolts.
  router.post('/jolt', joltHttp.giveJolt);
  router.get('/jolt', joltHttp.getJolts);

  return router;
}

module.exports = createRouter;

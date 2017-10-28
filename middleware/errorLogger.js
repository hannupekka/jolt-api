const logger = require('../utils/logger');

/**
 * Logs errors to console.
 * @param {Object} err Error
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Callback
 */
const errorLogger = (err, req, res, next) => {
  const status = err.status ? err.status : 500;

  if (status >= 400) {
    logger.error(`Request headers: ${JSON.stringify(req.headers)}`);
    logger.error(err.stack);
  }

  next(err);
};

module.exports = errorLogger;

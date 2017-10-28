const http = require('http');

/**
 * Sends response to client on errors.
 * @param {Object} err Error
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Callback
 */
// eslint-disable-next-line
const errorResponder = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const httpMessage = http.STATUS_CODES[status];

  let message;
  if (status < 500) {
    message = `${httpMessage}: ${err.message}`;
  } else {
    message = httpMessage;
  }

  const response = { message };
  if (err.data) {
    response.errors = err.data;
  }

  res.status(status).send(response);
};

module.exports = errorResponder;

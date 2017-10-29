const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const validateHeaders = require('../middleware/headerValidation');
const errorLogger = require('../middleware/errorLogger');
const errorResponder = require('../middleware/errorResponder');
const createRouter = require('./router');

const createApp = () => {
  const app = express();

  app.set('trust proxy', true);
  // Express middlewares.
  app.use(bodyParser.json());
  app.use(compression());
  app.use(helmet());
  app.use(validateHeaders);

  // Initialize routes
  const router = createRouter();
  app.use('/', router);

  // Error handling.
  app.use(errorLogger);
  app.use(errorResponder);

  return app;
};

module.exports = createApp;

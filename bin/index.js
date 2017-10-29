require('../utils/env')();
const enableDestroy = require('server-destroy');
const createApp = require('./app');
const logger = require('../utils/logger');

const app = createApp();

const PORT = 8000;
const server = app.listen(PORT, () => {
  logger.info(`Express server listening on port ${PORT}`);
});

enableDestroy(server);

const closeServer = signal => {
  logger.info(`${signal} received`);
  logger.info('Closing server ..');
  server.destroy();
};

// Handle signals gracefully. Heroku will send SIGTERM before idle.
process.on('SIGTERM', closeServer.bind(this, 'SIGTERM'));
process.on('SIGINT', closeServer.bind(this, 'SIGINT(Ctrl-C)'));

server.on('close', () => {
  logger.info('Server close event fired');

  // Emit cleanup so db etc modules can shutdown connections
  process.emit('cleanup');

  logger.info('Giving 100ms time to cleanup..');
  // Give a small time frame to clean up
  setTimeout(process.exit, 100);
});

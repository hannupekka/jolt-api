const winston = require('winston');

// Basic logger that outputs messages with human readable timestamps to console.
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      colorize: true,
      timestamp: () => new Date(),
    }),
  ],
});

module.exports = logger;

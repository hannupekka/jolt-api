// Get environmental variables.
const { NODE_ENV } = require('../config');

// Make sure NODE_ENV is one of the allowed ones.
if (!['development', 'production'].includes(NODE_ENV)) {
  throw new Error(`Invalid NODE_ENV ${NODE_ENV}`);
}

const REQUIRED_VARIABLES = ['NODE_ENV', 'FUM_API_URL', 'DB_URL'];

// Makes sure that each required environment variable is set.
module.exports = () => {
  REQUIRED_VARIABLES.forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Missing env variable: ${variable}`);
    }
  });
};

const { NODE_ENV } = require('../config');
const knexfile = require('../knexfile');
module.exports = require('knex')(knexfile[NODE_ENV]);

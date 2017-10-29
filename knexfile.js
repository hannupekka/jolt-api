const { DB_URL } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
};

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
};

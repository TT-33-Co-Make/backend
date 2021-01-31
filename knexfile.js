const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/tt-33-co-make.db3'},
    seeds: { directory: './data/seeds'}
  },

  testing: {
    ...sharedConfig,
    connection: { filename: './data/tt-33-co-make.db3'},
    seeds: { directory: './data/seeds'}
  },

  production: {
    ...sharedConfig,
    connection: { database: './data/tt-33-co-make.db3'},
  }
};

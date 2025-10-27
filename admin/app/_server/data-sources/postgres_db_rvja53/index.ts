import { KnexPgAdapter } from '@kottster/server';
import knex from 'knex';

/**
 * Learn more at https://knexjs.org/guide/#configuration-options
 */
const client = knex({
  client: 'pg',
  connection: {
    host: 'pgsql',
    port: 5432,
    user: 'pgsql',
    password: 'pgsql',
    database: 'pgsql',
  },
  searchPath: ['public'],
});

export default new KnexPgAdapter(client);
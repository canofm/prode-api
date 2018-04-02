const path = require('path');
const _    = require('lodash');

// ---

const ROOT = path.join(__dirname, '..');
const ENV  = process.env.NODE_ENV || 'development';

// ---

module.exports = {
  apis: {
    v1: {
      baseUri:     '/api/v1',
      raml:        path.join(ROOT, '/assets/raml/api.v1.raml'),
      jsonMaxSize: '400kb'
    }
  },
  database: {
    client: 'pg',
    connection: {
      host : 'localhost',
      port: 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'prode'
    }
  },
  express: {
    host: '0.0.0.0',
    port: _.get(process.env, 'PORT', 8080)
  },
  logger: {
    console: {
      enabled:     true,
      level:       'debug',
      timestamp:   true,
      prettyPrint: true
    }
  }
};

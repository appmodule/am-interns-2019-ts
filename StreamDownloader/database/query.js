'use strict';
const { Pool } = require('pg')

const env = process.env
const pool = new Pool({
  user: env.PGUSER,
  host: env.PGHOSTADDR,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  port: env.PGPORT,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
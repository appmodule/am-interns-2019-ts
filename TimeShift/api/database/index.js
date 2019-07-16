const { Pool } = require('pg')

const pool = new Pool({
  user: 'appmodule',
  host: '192.168.0.111',
  database: 'timeshift',
  password: '***REMOVED***',
  port: 5432
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}


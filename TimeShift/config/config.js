require('dotenv').config()
module.exports=
  {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": "sequelize",
    "host": process.env.PGHOSTADDR,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": "test_timeshift",
    "host": process.env.PGHOSTADDR,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'timeshift',
      host: 'db',
      dialect: 'postgres'
  },
  "production1": {
    "username": "root",
    "password": process.env.DATABASE_PASSWORD,
    "database": "timeshift",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
  
}
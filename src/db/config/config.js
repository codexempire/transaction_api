const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DBNAME,
    host: process.env.TEST_DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
  },
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  port: process.env.PORT || 5000,
  secret: process.env.SECRET
};


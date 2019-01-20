const Sequelize = require('sequelize')

const config = require('../config')

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false,
    logging: false
  }
)

module.exports = {
  sequelize
}

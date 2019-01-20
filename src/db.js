const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'pxrgzxth',
  'pxrgzxth',
  'SOUXmJuTK_u_02-S1HebeTTzJIYUu2PT',
  {
    host: 'baasu.db.elephantsql.com',
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

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'LansweeperMFA',
  'pxrgzxth',
  'SOUXmJuTK_u_02-S1HebeTTzJIYUu2PT',
  {
    host: 'baasu.db.elephantsql.com',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
)

module.exports = {
  sequelize
}

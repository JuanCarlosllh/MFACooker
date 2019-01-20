const Sequelize = require('sequelize')
const { sequelize } = require('../db')

const Product = sequelize.define('product', {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING }
})

module.exports = {
  Product
}

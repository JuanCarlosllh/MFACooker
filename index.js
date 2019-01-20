require('dotenv').config()
const cron = require('node-cron')

const config = require('./config')
const { getProductsFromSearch } = require('./src/searchScraping')
const { Product } = require('./src/models/Product')
const { sequelize } = require('./src/db')
const { removeDuplicates } = require('./src/utis')

const syncProducts = async () => {
  const smallAppliances = await getProductsFromSearch(
    `${config.SCRAPING_URL}/search/small-appliances`
  )
  const dishwashers = await getProductsFromSearch(
    `${config.SCRAPING_URL}/search/dishwashers`
  )

  const products = removeDuplicates('id', [...smallAppliances, ...dishwashers])
  await Product.destroy({ where: {} })
  await Product.bulkCreate(products)
  console.log(`SAVED ${products.length} PRODUCTS`)
}

const executeSync = () => {
  syncProducts().catch(e => {
    console.log('ERROR loading products')
    console.error(e)
  })
}

executeSync()
cron.schedule('* * * * *', () => {
  console.log('Started products sync')
  executeSync()
})

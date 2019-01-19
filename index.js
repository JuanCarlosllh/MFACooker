require('dotenv').config()

const config = require('./config')
const { getAppliancesFromList } = require('./src/searchScraping')

const getInfo = async () => {
  const smallAppliances = await getAppliancesFromList(
    `${config.SCRAPING_URL}/search/small-appliances`
  )
  const dishwashers = await getAppliancesFromList(
    `${config.SCRAPING_URL}/search/dishwashers`
  )
  console.log(
    `DONE: Loaded ${smallAppliances.length + dishwashers.length} products`
  )
}

getInfo()

require('dotenv').config()

const { getSmallAppliances } = require('./scraping/smallApplicances')

getSmallAppliances().then(appliances => {
  console.log(appliances)
})

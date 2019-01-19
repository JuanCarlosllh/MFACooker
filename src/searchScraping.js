const axios = require('axios')
const cheerio = require('cheerio')

const searchScrapping = async (url, generateData) => {
  const smallAppliances = await axios.get(url)
  if (smallAppliances.status === 200) {
    const firstPage = cheerio.load(smallAppliances.data)
    const paginationLinks = firstPage('.result-list-pagination a').toArray()
    const lasPaginationLink =
      paginationLinks.length - (paginationLinks.length >= 4 ? 1 : 2)
    const numPages = paginationLinks[lasPaginationLink].attribs.href
      .split('page=')
      .pop()
    console.log(`Loading ${numPages} pages`)
    const products = await Promise.all(
      [...Array(parseInt(numPages)).keys()].map(async page => {
        const searchPage = await axios.get(`${url}?page=${page + 1}`)
        return generateData(searchPage.data, page)
      })
    )

    return products.reduce((acc, curr) => [...acc, ...curr], [])
  } else {
    throw new Error('Error getting small-appliances')
  }
}

const getAppliancesFromList = url =>
  searchScrapping(url, (data, page) => {
    let $ = cheerio.load(data)
    const parsedAppliances = $('.search-results-product')
      .map((i, el) => {
        const id = cheerio('h4 a', el)
          .attr('href')
          .split('/')
          .pop()
        const name = cheerio('h4 a', el).text()
        const prize = cheerio('h3', el).text()
        const image = cheerio('.product-image img', el).attr('src')
        return {
          id,
          name,
          prize,
          image
        }
      })
      .toArray()
    console.log(`Loaded page ${page + 1}!`)
    return parsedAppliances
  })

module.exports = {
  getAppliancesFromList
}

module.exports = { getAppliancesFromList }

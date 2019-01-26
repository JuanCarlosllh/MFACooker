const axios = require('axios')
const cheerio = require('cheerio')

const searchScrapping = async (url, generateData) => {
  const type = url.split('/').pop()
  const productsPageData = await axios.get(url)
  if (productsPageData.status === 200) {
    const firstPage = cheerio.load(productsPageData.data)
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
        return generateData(searchPage.data, type, page)
      })
    )

    return products.reduce((acc, curr) => [...acc, ...curr], [])
  } else {
    throw new Error('Error scraping products')
  }
}

const getProductsFromSearch = url =>
  searchScrapping(url, (data, type, page) => {
    let $ = cheerio.load(data)
    const parsedAppliances = $('.search-results-product')
      .map((i, el) => {
        const id = cheerio('h4 a', el)
          .attr('href')
          .split('/')

        const name = cheerio('h4 a', el).text()
        const price = cheerio('h3', el)
          .text()
          .replace('€', '')
        const image = cheerio('.product-image img', el).attr('src')
        return {
          id: `${id[id.length - 1]}`,
          name,
          price: parseFloat(price),
          image,
          type
        }
      })
      .toArray()
    console.log(`Loaded page ${page + 1}!`)
    return parsedAppliances
  })

module.exports = {
  getProductsFromSearch
}

module.exports = { getProductsFromSearch }

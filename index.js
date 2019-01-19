require("dotenv").config();
const config = require("./config");
const axios = require("axios");
const cheerio = require("cheerio");

const getSmallAppliances = async () => {
  console.log("loading page 1");
  const smallAppliances = await axios.get(
    `${config.SCRAPING_URL}/search/small-appliances?page=1`
  );
  const $ = cheerio.load(smallAppliances.data);
  const appliances = $(".product-description h4 a");
};

getSmallAppliances();

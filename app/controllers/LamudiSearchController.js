const cheerio = require("cheerio");

const Controller = require("../cores/Controller");
const scraper = require("../utilities/scraper");
const { getCurrency } = require("../helpers/functions");

class LamudiSearchController extends Controller {
  async all () {
    const { req, res } = this;
    const { q } = req.query;
    const response = await scraper({
      baseurl: "https://www.lamudi.co.id/",
      path: `/buy?q=${ q }`
    });
    try {
      const $ = await cheerio.load(response.data);
      
      let results = [];
      $(".js-MainListings-container").map(function() {

        const $element = cheerio.load($(this).html());
        
        let link = $element("a.js-listing-link").attr("href");
        let title = $element("h2.ListingCell-KeyInfo-title").text().trim();
        let address = $element(".ListingCell-KeyInfo-address").text().trim();
        let thumbnail = $element(".ListingCell-image img").attr("src");
        let price = $element(".PriceSection-FirstPrice").text().trim();
        let slug = new URL(link).pathname.slice(1);
        
        if (!title) return;
        
        results.push({
          title: title,
          address: address,
          thumbnail: thumbnail,
          link: link,
          slug: slug,
          currency: getCurrency(price),
          price: price
        });
      });
      
      this.response({
        page_title: $("title").text().trim(),
        data: results
      })
    } catch (e) {
      this.error({
        message: e.stack,
      });
      ///console.log(response)
    }
    
  }
}

module.exports = LamudiSearchController;
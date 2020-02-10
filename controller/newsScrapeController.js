const express = require("express");
const router = express.Router();
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


////// CUSTOM JS PASSED THHROUGH HANDLEBARS
var indexJs = ('/assets/js/index.js');
var savedJs = ('/assets/js/saved.js');


///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////        ROUTING      //////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Homepage
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'RS Mongo Scraper',
    indexScript: indexJs

  });
});

// Saved Articles
router.get('/saved', function (req, res, next) {

  res.render('saved', {
    title: 'Your Saved Articles',
    savedScript: savedJs
  });
});


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////       MONGOOSE  ROUTING      /////////////
//////////////////////////////////////////////////////////////

router.get('/scrape', function (req, res) {

  console.log("\n***********************************\n" +
    "Grabbing every title and link\n" +
    "from reverb:" +
    "\n***********************************\n");

  axios.get("https://www.rollingstone.com/music/music-news/").then(function (response) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);



    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("li.l-river__item").each(function (i, element) {

      let results = {};
      const articleContent = $(element).children();
      const aElement = articleContent.children();


      results.title = aElement.find('header').find('h3').text().trim();
      results.blurb = aElement.find('header').find('p').text().trim();
      results.image = aElement.find('figure').find('img').attr('data-src');
      results.articleURL = aElement.attr('href');

      if (results.title === '' | results.blurb === '' | results.articleURL === undefined | results.image === undefined) {
        return;
      }
      db.Article.create(results)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    
    res.render('index', {
      title: 'Scraped RS Articles',
      savedScript: savedJs
    });
    
  });
});





module.exports = router;
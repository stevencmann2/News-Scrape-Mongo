const express = require("express");
const router = express.Router();

// const db = require('../models')


//SCRAPING
var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server.js is doing
////MVP:
/////////////// TITLE, SUMMARY, URL 
//OPTIONAL -- photos etc. 
console.log("\n***********************************\n" +
            "Grabbing every title and link\n" +
            "from reverb:" +
            "\n***********************************\n");



axios.get("https://reverb.com/").then(function(response) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(response.data);
 
  let results = [];

  $("li.tiles__tile").each(function(i, element) {
    
    // console.log(element)
    let title = $(element).children().text();
    let link = $(element).find("a").attr("href");

    
    results.push({
      title: title,
      link: link
    });
  });

  console.log(results);
});



////// CUSTOM JS PASSED THHROUGH HANDLEBARS
var indexJs= ('/assets/js/index.js');
var savedJs= ('/assets/js/saved.js');


///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////        ROUTING      //////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Homepage
router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Scrape Recent News',
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










module.exports = router;
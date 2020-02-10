const express = require("express");
const router = express.Router();
var logger = require("morgan");
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



axios.get("https://www.rollingstone.com/music/music-news/").then(function(response) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("li.l-river__item").each(function(i, element) {
    
    console.log(element)
    
    const articleContent = $(element).children();
    const aElement = articleContent.children();
    const title = aElement.find('header').find('h3').text();
    const blurb = aElement.find('header').find('p').text()
    const image = aElement.find('figure').find('img').attr('data-src');
    const articleURL = aElement.attr('href') 



       const link = articleContent.find('a').attr('href')

    // const GridCard = gridCard.find('a').attr('href');
    // const link = $(element).attr("href");

    


    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      blurb: blurb,
      articleURL: articleURL,
      image: image
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
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


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////       MONGOOSE  ROUTING      /////////////
//////////////////////////////////////////////////////////////







module.exports = router;
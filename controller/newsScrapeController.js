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

    
    res.redirect('/')
    console.log('ran scrape')
  });
});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({isSaved: false})
  .then(function(dbArticle) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });

});

//ROUTE FOR ALL SAVED ARTICLES
router.get("/articles/saved", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({isSaved: true})
  .then(function(dbArticle) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });

});

//////// ROUTE FOR SAVING ARTICLES
router.put("/articles/save/:id", function (req, res){
  db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {isSaved: true}})
  .then(function(dbArticle) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });


})

/////// ROUTE FOR UNSAVING ARTICLES
router.put("/articles/unsave/:id", function (req, res){
  db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {isSaved: false}})
  .then(function(dbArticle) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });


})


// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});




//ROUTE FOR  CLEARING SAVED
router.delete("/articles", function(req, res) {
  db.Article.deleteMany({})
  .then(function(dbArticle) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });

});

router.delete("/note/:id", function(req, res) {
  db.Note.deleteOne({ _id: req.params.id })
  .then(function(dbNote) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbNote);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });

});



module.exports = router;
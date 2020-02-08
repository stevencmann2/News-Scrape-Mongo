const express = require("express");
const router = express.Router();

// const db = require('../models')


var indexJs= ('/assets/js/index.js');
var savedJs= ('/assets/js/saved.js');



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
const express = require("express");
const router = express.Router();

// const db = require('../models')



// Homepage
router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Scrape Recent News',

    });
});

// Saved Articles
router.get('/saved', function (req, res, next) {

    res.render('saved', {
        title: 'Your Saved Articles',
    });
});










module.exports = router;
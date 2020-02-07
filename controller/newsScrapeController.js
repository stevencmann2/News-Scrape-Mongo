const express = require("express");
const router = express.Router();

// const db = require('../models')






// Homepage
router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Scrape Recent News',

    });
});





module.exports = router;
const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const exphbs = require("express-handlebars");
const path = require('path');
var logger = require("morgan");

var PORT = process.env.PORT || 3000;
var app = express();
// mongoHeadlines is the database name 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/rollingStoneMongoDb";

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());






const router = require('./controller/newsScrapeController.js')
app.use(router);

app.listen(3000, function () {
    console.log (' App listening  and running on Port 3000')
});


//ask about URL parser?????????
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//once is a listener
//on is a listener
mongoose.connection
    .once('open', () => console.log('MongoDB is Connected in server.js'))
    .on('error', (error) => {
        console.log("The Error is", error)
    });
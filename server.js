const mongoose = require('mongoose');

// mongoHeadlines is the database name 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//ask about URL parser?????????
mongoose.connect(MONGODB_URI, 
    {useNewUrlParser: true,
    useUnifiedTopology: true
    });

//once is a listener
//on is a listener
mongoose.connection
    .once('open', () => console.log('MongoDB is Connected in server.js'))
    .on('error', (error) => {
        console.log("The Error is", error)
    });
const express = require('express');         // for creating back-end applications
const request = require('request-promise'); // for API requests

const app = express();                      // initialize application
const PORT = process.env.PORT  ||  5000;    // use dynamic port or port 5000

app.use(express.json());                    // parse JSON input

app.get('/', (req, res) => {                // specify what to 'send back' when someone visits this API
    res.send('Welcome to Amazon Scraper API!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
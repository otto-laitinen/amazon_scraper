const express = require('express');                 // for creating back-end applications
const request = require('request-promise');         // for API requests

const app = express();                              // initialize application
const PORT = process.env.PORT  ||  5000;            // use dynamic port or port 5000

// const apiKey = 'b13c5834dd03b7af4cbdae4e490b643e';  // API key
// const generateScraperUrl(apiKey) = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());                            // parse JSON input

app.get('/', (req, res) => {                        // specify what to 'send back' when someone visits this API
    res.send('Welcome to Amazon Scraper API!');
});

// GET Product DETAILS
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;                  // this is where the API key is gotten from

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})


// GET Product REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;                  // this is where the API key is gotten from

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})


// GET Product OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;                  // this is where the API key is gotten from

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})


// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;                  // this is where the API key is gotten from
    
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
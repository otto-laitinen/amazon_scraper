const express = require('express');                 // for creating back-end applications
const request = require('request-promise');         // for API requests

const app = express();                              // initialize application
const PORT = process.env.PORT  ||  5000;            // use dynamic port or port 5000

const apiKey = 'b13c5834dd03b7af4cbdae4e490b643e';  // API key
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());                            // parse JSON input

app.get('/', (req, res) => {                        // specify what to 'send back' when someone visits this API
    res.send('Welcome to Amazon Scraper API!');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
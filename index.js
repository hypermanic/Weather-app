const express = require('express');
const axios = require('axios');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Home route to render the form
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null }); // Renders 'views/index.ejs'
});

// API route to get weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.render('index', { weather: null, error: 'Please enter a city name.' });
    }

    const apiKey = 'f45d0939e847ac5eb0cbc46bc0f93ae8';
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // Check if the response contains valid weather data
        if (response.data.cod === "404") {
            return res.render('index', { weather: null, error: 'City not found. Please enter a valid city name.' });
        }

        res.render('weather', { weather: response.data, error: null });
    } catch (error) {
        res.render('index', { weather: null, error: 'City name not found . Please try again' });
    }
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

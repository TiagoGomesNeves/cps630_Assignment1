const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

let weather_library =[
    {title: 'Toronto', weather: 'snowy', population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" }
    
];

app.use('/', express.static(path.join(__dirname, '/public')));

// These will be the links to our html pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/weather', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/weather.html'));
});

app.get('/charts', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/charts.html'));
});


// API 
app.get('/api/cities', (req, res) => {
    res.status(200).json(weather_library);
    console.log(weather_library);
});

// Starts the server, listens on port 8080
app.listen(PORT, () => {console.log("listening")});
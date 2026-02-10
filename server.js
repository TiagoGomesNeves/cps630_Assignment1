const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

let weather_library =[
    {title: 'Toronto', weather: 'snowy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Toronto', weather: 'snowy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" }
        
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

// Sends our city json list to frontend
app.get('/api/cities',  (req, res) => {
    res.status(200).json(weather_library);
    console.log(weather_library);
});

// Used to update information in the city
// app.patch('/api/cities/:')

//Used to add new city data to our city json storage
app.post('/api/cities', express.json(), (req,res) => {
    
});

// Use to delete record from "Database"
app.delete('/api/cities/title/:title', (req,res) =>{
    const reqTitle = req.params.title;
    let index = -1;

    for (let i =0; i < weather_library.length; i++){
        if (weather_library[i].title.toLowerCase() == reqTitle.toLowerCase()){
            index = i;
            break;
        }
    }

    if (index === -1){
        res.status(404).json({error: "Book " + reqTitle  + " was not Found"});
    }else{
        book = weather_library[index];
        weather_library.splice(index, 1);
        console.log("index: ", index);
        console.log(weather_library);
        res.status(204).json(book);
    }

});


// Starts the server, listens on port 8080
app.listen(PORT, () => {console.log("listening")});
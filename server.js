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
});

// Used to update information in the city
app.patch('/api/cities/title/:title', express.json(),  (req,res) => {
    const cityTitle = req.params.title;
    const updatedData = req.body;
    console.log(updatedData);
    let index = -1;

    for (let i =0; i < weather_library.length; i++){
        if (weather_library[i].title.toLowerCase() == cityTitle.toLowerCase()){
            index = i;
            break;
        }
    }
    console.log("Before");
    console.log(weather_library);

    //Although user does not update title, this prevents wierd bugs where city is deleted before updated
    if ( index == -1){
        res.status(404).json({error: "City " + cityTitle  + " was not Found"});
    }else{
        weather_library[index].weather = updatedData.weather;
        weather_library[index].population = updatedData.population;
        weather_library[index].temperature = updatedData.temperature;
        weather_library[index].gdp = updatedData.gdp;
        weather_library[index].description = updatedData.description;
        console.log("After");
        console.log(weather_library);
        res.status(204).json(weather_library);
        console.log("done");
    }


}); 

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
        res.status(404).json({error: "City " + reqTitle  + " was not Found"});
    }else{
        city = weather_library[index];
        weather_library.splice(index, 1);
        console.log("index: ", index);
        console.log(weather_library);
        res.status(204).json(city);
    }

});


// Starts the server, listens on port 8080
app.listen(PORT, () => {console.log("listening")});
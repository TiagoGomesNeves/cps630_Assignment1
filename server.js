const express = require('express');
const path = require('path');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const app = express();
const PORT = 8080;

let weather_library =[
    {title: 'Toronto', weather: 'snowy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Chicago', weather: 'rainy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Atlanta', weather: 'windy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Brampton', weather: 'cloudy', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" },
    {title: 'Kingston', weather: 'sunny', temperature: 9, population:99999999999, gdp: 100000, img:'toronto.jpg', description: "Its a city" }
        
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
    let index = -1;

    for (let i =0; i < weather_library.length; i++){
        if (weather_library[i].title.toLowerCase() == cityTitle.toLowerCase()){
            index = i;
            break;
        }
    }

    //Although user does not update title, this prevents wierd bugs where city is deleted before updated
    if ( index == -1){
        res.status(404).json({error: "City " + cityTitle  + " was not Found"});
    }else{
        weather_library[index].weather = updatedData.weather;
        weather_library[index].population = updatedData.population;
        weather_library[index].temperature = updatedData.temperature;
        weather_library[index].gdp = updatedData.gdp;
        weather_library[index].description = updatedData.description;
        res.status(204).json(weather_library);
    }


}); 

//Used to add new city data to our city json storage
app.post('/api/cities', upload.single('img'), (req,res) => {
    const newData = req.body;
    const img = req.file
    if (!newData.title || !newData.weather || !newData.temperature || !newData.population || !newData.gdp || !newData.description || !img.filename){
        res.status(400).json({error: "Bad Request Not all fields filled"});
    }
    const newCity = {
        title: newData.title,
        weather: newData.weather,
        temperature: newData.temperature,
        population: newData.population,
        gdp: newData.gdp,
        img: img ? img.filename : 'default.jpg',
        description: newData.description
    };

    weather_library.push(newCity);
    res.status(201).json(newCity);
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

app.get('/api/cities/title', (req,res) =>{
    let cities = [];

    weather_library.forEach(e => {
        if (!cities.includes(e.title)){
            cities.push(e.title);
        }
    });
    console.log(cities);
    res.status(200).json(cities);
});


app.get('/api/cities/title/:title', (req,res)=>{
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
        res.status(200).json(city);
    }
});



// Starts the server, listens on port 8080
app.listen(PORT, () => {console.log("listening")});
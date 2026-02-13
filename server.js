const express = require('express');
const path = require('path');
const multer = require('multer');

const upload = multer({dest: './public/images'});
const app = express();
const PORT = 8080;

let weather_library =[
    {title: 'Toronto', weather: 'cloudy', temperature: -5, population: 7100000, gdp: 332000000000, img:'toronto.jpg', description: "Largest city in Canada and financial hub of Ontario" },
    {title: 'Chicago', weather: 'sunny', temperature: 1, population: 2720000, gdp: 689000000000, img:'chicago.jpg', description: "Major U.S. city known for its architecture and economy" },
    {title: 'Atlanta', weather: 'sunny', temperature: 12, population: 530000, gdp: 406000000000, img:'atlanta.jpg', description: "Economic and cultural centre of the southeastern United States" },
    {title: 'New York City', weather: 'cloudy', temperature: 0, population: 8500000, gdp: 1700000000000, img:'nyc.jpg', description: "Largest city in the United States and global financial capital" },
    {title: 'Seattle', weather: 'windy', temperature: 10, population: 820000, gdp: 387000000000, img:'seattle.jpg', description: "Pacific Northwest city known for technology and coffee culture" },
    {title: 'Vancouver', weather: 'rainy', temperature: 8, population: 767000, gdp: 151000000000, img:'vancouver.jpg', description: "Coastal Canadian city known for film, trade, and tourism" },
    {title: 'Halifax', weather: 'snowy', temperature: -2, population: 512000, gdp: 25000000000, img:'halifax.jpg', description: "Atlantic Canadian port city with growing maritime economy" },
    {title: 'Winnipeg', weather: 'cloudy', temperature: -2, population: 850000, gdp: 43000000000, img:'winnipeg.jpg', description: "Prairie city in Manitoba known for transportation and manufacturing" },
    {title: 'Montreal', weather: 'sunny', temperature: -6, population: 4300000, gdp: 230000000000, img:'montreal.jpg', description: "Quebec’s largest city known for culture and aerospace industries" },
    {title: 'London', weather: 'rainy', temperature: 7, population: 9000000, gdp: 565000000000, img:'london.jpg', description: "Capital of the United Kingdom and global financial centre" },
    {title: 'Los Angeles', weather: 'sunny', temperature: 16, population: 3900000, gdp: 1040000000000, img:'losangeles.jpg', description: "Major California city known for entertainment and global trade" },
    {title: 'Mexico City', weather: 'cloudy', temperature: 23, population: 9200000, gdp: 411000000000, img:'mexicocity.jpg', description: "Capital of Mexico and one of the largest cities in North America" }
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

    // Although user does not update title, this prevents weird bugs where city is deleted before updated
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

// Used to add new city data to our city json storage
app.post('/api/cities', upload.single('img'), (req,res) => {
    const newData = req.body;
    const img = req.file
    if (!newData.title || !newData.weather || !newData.temperature || !newData.population || !newData.gdp || !newData.description || !img){
        console.log("Here");
        return res.status(400).json({error: "Bad Request Not all fields filled"});
    }
    console.log("now here");
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

app.use((req, res) => {
    res.status(404).type("text").send("404: Page Not Found: Invalid URL");
});


// Starts the server, listens on port 8080
app.listen(PORT, () => {console.log("listening")});
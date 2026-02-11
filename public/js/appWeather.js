document.addEventListener('DOMContentLoaded', () =>{
    loadContent();
});

async function loadContent(){
    try{
        const response = await fetch('/api/cities/title');
        const cities = await response.json();

        const container = document.getElementById('selector');
        cities.forEach(element => {
            let option = document.createElement('option');
            option.value = element;
            option.textContent = element;
            container.append(option);
        });
    }catch(error){
        console.error("Error: ", error);
    }
}


document.getElementById('selector').addEventListener('change', async (e) =>{
    const title = e.target.value;
    
    try{
        const response = await fetch(`api/cities/title/${title}`);
        const city = await response.json();

        if (response.status == 200){
            switch(city.weather.toLowerCase()){
                case "sunny":
                    sunnyCard(city);
                    break;
                case "snowy":
                    snowyCard(city);
                    break;
                case "cloudy":
                    cloudyCard(city);
                    break;
                case "rainy":
                    rainyCard(city);
                    break;
                default:
                    windyCard(city);
            }
        }
        else{
            console.log("Error: ", response.error);
        }

    }catch(error){
        console.error("Error: ", error);
    }
});


function snowyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;
}

function sunnyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;
}

function rainyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;
}

function windyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;
}

function cloudyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;
}


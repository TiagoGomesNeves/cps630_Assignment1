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
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    const cloudContainer = document.getElementById("page");
    cloudContainer.style.removeProperty("background-color");
    cloudContainer.style.removeProperty("opacity");

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

    particlesJS("particles-js", {
        particles: {
            number: { value: 100 },
            color: { value: "#d4c4c4" },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: {
                value: 7,      
                random: true    
            },
            move: { enable: true, direction: "bottom", speed: 2 },
            line_linked: { enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });
}

function sunnyCard(city){ 
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;


    particlesJS("sun", {
        particles: {
            number: { value : 0.5},
            shape: {type: "circle"},
            move: {enable: true, direction: "right", speed: 1.5, out_mode: "bounce" },
            size: {value: 100},
            shape: {type: "image", image: {src: "../images/sun.png", width: 100, height: 100}},
            opacity: {value: 0.8},
            line_linked: {enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });

    particlesJS("particles-js", {
        particles: {
            number: { value: 100 },
            color: { value: "#bebc2a" },
            shape: { type: "polygon", polygon: {nb_sides: 4} },
            opacity: { value: 0.8 },
            size: { value: 2.5 },
            move: { enable: true, direction: "down", speed: 20},
            stroke: {width: 1},
            line_linked: { enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });


}

function rainyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;

    particlesJS("cloud", {
        particles: {
            number: { value : 250},
            shape: {type: "image", image: {src: "../images/cloud.png", width: 100, height: 50}},
            move: {enable: true, direction: "right", speed: 2, out_mode: "bounce" },
            size: {value: 100},
            line_linked: {enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });

    particlesJS("particles-js", {
        particles: {
            number: { value: 100 },
            color: { value: "#367087" },
            shape: { type: "polygon", polygon: {nb_sides: 4} },
            opacity: { value: 0.8 },
            size: { value: 2.5 },
            move: { enable: true, direction: "bottom", speed: 10},
            stroke: {width: 1},
            line_linked: { enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });
}

function windyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;

    particlesJS("particles-js", {
        particles: {
            number: { value : 30},
            shape: {type: "image", image: {src: "../images/wind.png", width: 225, height: 225}},
            move: {enable: true, direction: "right", speed: 30, out_mode: "out" },
            line_linked: {enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });
}

function cloudyCard(city){
    const container = document.querySelector(".weather-card-container");
    container.innerHTML = `
        <h2>Current Weather in ${city.title} is ${city.weather} and it is ${city.temperature} degrees out</h2>
        <div>
        <img src="images/${city.img}" height="500px">
        </div>
    `;

     particlesJS("cloud-cloudy", {
        particles: {
            number: { value : 70},
            shape: {type: "image", image: {src: "../images/cloud.png", width: 100, height: 50}},
            move: {enable: true, direction: "right", speed: 2, out_mode: "bounce" },
            size: {value: 100},
            line_linked: {enable: false}
        },
        interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    });

    const cloudContainer = document.getElementById("page");
    cloudContainer.style.backgroundColor = "grey";
    cloudContainer.style.opacity = "0.6";



}


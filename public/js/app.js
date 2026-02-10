
// When page is loaded we load the content 
document.addEventListener('DOMContentLoaded', () =>{
    loadContent();
});


// Calls API for all the cities
async function loadContent(){
    try{
        const response = await fetch('/api/cities');
        const cities = await response.json();
        display(cities);
    }catch(error){
        console.error("Cities couldnt load: ", error);
    }
}


// Goes through the list of cities and uses that information to build them a card
function display(cities){

    const container = document.querySelector('.card-container');
    if (cities.length == 0){
         const elem = document.createElement('div');
         elem.innerHTML = ` 
            <div class="no-cities">No City Data Available</div>
         `;
         container.append(elem);
    }
    cities.forEach(city => {
        const elem = document.createElement('div');
        elem.classList.add('card');
        elem.innerHTML = `
            <img src="/images/${city.img}" alt="${city.title}">
            <h3> ${city.title} </h3>
            <p>${city.description}</p>
            <div class="buttons">
                <button class="button-update">Update</button>
                <button class="button-delete" value="${city.title}">Delete</button>
            </div>
        `;

        elem.querySelector('.button-delete').addEventListener('click', () => {
            deleteCity(city.title); 
        });

        elem.querySelector('.button-update').addEventListener('click', () =>{
            updateCity(city);
        });

        container.appendChild(elem);
    });

}


function resetHome(){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
}

// This is used in our update form and patch request so we know which instance to update
let selectedCityTitle = "";


function updateCity(city){
    const container = document.getElementById('update-form-container');
    selectedCityTitle = city.title;

    document.getElementById('weather').value=city.weather;
    document.getElementById('temp').value=city.temperature;
    document.getElementById('pop').value=city.population;
    document.getElementById('gdp').value=city.gdp;
    document.getElementById('desc').value=city.description;

    container.classList.remove('hidden');
}

document.getElementById('update-form-cancel').addEventListener('click', () =>{
    document.getElementById('update-form-container').classList.add('hidden');
});



document.querySelector('#update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let updateData = {};

    const weather = document.getElementById('weather').value;
    const temperature = document.getElementById('temp').value;
    const population = document.getElementById('pop').value;
    const gdp = document.getElementById('gdp').value;
    const description = document.getElementById('desc').value;

    if (weather) updateData.weather = weather;
    if (temperature) updateData.temperature = Number(temperature);
    if (population) updateData.population = Number(population);
    if (gdp) updateData.gdp = Number(gdp);
    if (description) updateData.description = description;

    try{
        const response = await fetch(`/api/cities/title/${selectedCityTitle}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(updateData)
        });
        if (response.status === 204){
            alert("City Successfully Updated");
            document.getElementById('update-form-container').classList.add('hidden');
            resetHome();
            loadContent();
        }else{
            const result = await response.json();
            alert("Error: ", result.json);
        }


    }catch(error){
        console.error("Error: ", error); 
    }
});

document.querySelector('.button-add').addEventListener('click', ()=> {
    addCityForm();
});

document.getElementById('add-form-cancel').addEventListener('click', () =>{
    document.getElementById('add-form-container').classList.add('hidden');
});

document.getElementById('add-form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    let newData = new FormData();
    const title = document.getElementById('add-title').value;
    const weather = document.getElementById('add-weather').value;
    const population = document.getElementById('add-pop').value;
    const temperature = document.getElementById('add-temp').value;
    const gdp = document.getElementById('add-gdp').value;
    const description = document.getElementById('add-desc').value;
    const img = document.getElementById('add-img').files[0];

    if (title) newData.append('title', title);
    if (weather) newData.append('weather', weather);
    if (temperature) newData.append('temperature', temperature);
    if (population) newData.append('population', population);
    if (gdp) newData.append('gdp', gdp);
    if (img) newData.append('img', img);
    if (description) newData.append('description', description);

    console.log(newData);
    try{
        const response = await fetch('/api/cities', {
            method: 'POST',
            body: newData
        })
        const result = await response.json();
        if (response.status == 201){
            alert("New City Added");
            document.getElementById('add-form-container').classList.add('hidden');
            resetHome();
            loadContent();
        }else{
            alert("Error: ", result.json);
        }
    }catch(error){
        console.error("Error: ", error);
    }





});

function addCityForm(){
    const container = document.getElementById('add-form-container');
    container.classList.remove('hidden');
}


    
async function deleteCity(title){
    
    try{
        const response = await fetch(`/api/cities/title/${title}`, {method: 'DELETE'});
        if (response.status === 204){
            alert("Succesfully Deleted Book");
            resetHome();
            loadContent();
        }else{
            const result = await response.json();
            alert("Error: ", result.json);
        }
    }catch (error){
        console.error("Book could not be deleted: ", error);
    }
};
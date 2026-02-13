// When page is loaded we load the content
document.addEventListener('DOMContentLoaded', () =>{
    loadContent();
});

// Hide helpers so we reuse same behaviour everywhere
function hideUpdateForm(){
    document.getElementById('update-form-container').classList.add('hidden');
}

function hideAddForm(){
    document.getElementById('add-form-container').classList.add('hidden');
}

// Backdrop click closes modal
document.getElementById('update-form-container').addEventListener('click', (e) => {
    if (e.target.id === 'update-form-container'){
        hideUpdateForm();
    }
});

document.getElementById('add-form-container').addEventListener('click', (e) => {
    if (e.target.id === 'add-form-container'){
        hideAddForm();
    }
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

    // Create one card per city and attach update/delete handlers
    cities.forEach(city => {
        const elem = document.createElement('div');
        elem.classList.add('card');
        elem.innerHTML = `
            <img src="/images/${city.img}" alt="${city.title}">
            <h3> ${city.title} </h3>
            <p>${city.description}</p>
            <div class="buttons">
                <button class="button-update">
                <img class="button-icon" src="/images/edit.png" alt="edit-button" aria-hidden="true">
                </button>
                <button class="button-delete" value="${city.title}">
                <img class="button-icon" src="/images/delete.png" alt="delete-button" aria-hidden="true">
                </button>
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

    // Pre-fill update form fields with current values
    document.getElementById('temp').value=city.temperature;
    document.getElementById('pop').value=city.population;
    document.getElementById('gdp').value=city.gdp;
    document.getElementById('desc').value=city.description;

    container.classList.remove('hidden');
}

// Cancel button closes update modal
document.getElementById('update-form-cancel').addEventListener('click', () =>{
    hideUpdateForm();
});

// Submit update form and PATCH the selected city
document.querySelector('#update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let updateData = {};

    // Read user inputs
    const weather = document.getElementById('weather').value;
    const temperature = document.getElementById('temp').value;
    const population = document.getElementById('pop').value;
    const gdp = document.getElementById('gdp').value;
    const description = document.getElementById('desc').value;

    // Only include fields that were provided
    if (weather) updateData.weather = weather;
    if (temperature) updateData.temperature = temperature;
    if (population) updateData.population = population;
    if (gdp) updateData.gdp = gdp;
    if (description) updateData.description = description;

    try{
        const safeTitle = encodeURIComponent(selectedCityTitle);

        const response = await fetch(`/api/cities/title/${safeTitle}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(updateData)
        });

        // 200 means update succeeded in this implementation
        if (response.status === 200){
            alert("City Successfully Updated");
            hideUpdateForm();
            resetHome();
            loadContent();
        }else{
            const result = await response.json();
            alert("Error: " + result.error);
        }

    }catch(error){
        console.error("Error: ", error);
    }
});

// Opens add modal when floating + button is clicked
document.querySelector('.button-add').addEventListener('click', ()=> {
    addCityForm();
});

// Cancel button closes add modal
document.getElementById('add-form-cancel').addEventListener('click', () =>{
    hideAddForm();
});

// Submit add form and POST a new city
document.getElementById('add-form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    let newData = new FormData();

    // Read user inputs
    const title = document.getElementById('add-title').value;
    const weather = document.getElementById('add-weather').value;
    const population = document.getElementById('add-pop').value;
    const temperature = document.getElementById('add-temp').value;
    const gdp = document.getElementById('add-gdp').value;
    const description = document.getElementById('add-desc').value;
    const img = document.getElementById('add-img').files[0];

    // Add only filled values to FormData
    if (title) newData.append('title', title);
    if (weather) newData.append('weather', weather);
    if (temperature) newData.append('temperature', temperature);
    if (population) newData.append('population', population);
    if (gdp) newData.append('gdp', gdp);
    if (img) newData.append('img', img);
    if (description) newData.append('description', description);

    try{
        const response = await fetch('/api/cities', {
            method: 'POST',
            body: newData
        });

        const result = await response.json();

        // 201 means created successfully
        if (response.status == 201){
            alert("New City Added");
            hideAddForm();
            document.getElementById('add-form').reset();
            resetHome();
            loadContent();
        }else{
            alert("Error: " + result.error);
        }
    }catch(error){
        console.error("Error: ", error);
    }
});

// Shows add modal
function addCityForm(){
    const container = document.getElementById('add-form-container');
    container.classList.remove('hidden');
}

// Sends DELETE request for selected city title
async function deleteCity(title){
    try{
        const safeTitle = encodeURIComponent(title);

        const response = await fetch(`/api/cities/title/${safeTitle}`, {method: 'DELETE'});
        if (response.status === 200){
            alert("Succesfully Deleted Book");
            resetHome();
            loadContent();
        }else{
            const result = await response.json();
            alert("Error: " + result.error);
        }
    }catch (error){
        console.error("Book could not be deleted: ", error);
    }
};

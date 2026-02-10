
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
        console.log(city.title)
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

        container.appendChild(elem);
    });

}


function resetHome(){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
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
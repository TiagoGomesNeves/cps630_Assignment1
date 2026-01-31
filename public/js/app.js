
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
    cities.forEach(city => {
        const elem = document.createElement('div');
        elem.classList.add('card');
        console.log(city.title)
        elem.innerHTML = `
            <img src="/images/${city.img}" alt="${city.title}">
            <h3> ${city.title} </h3>
            <p>${city.description}</p>
        `;

        container.appendChild(elem);
    });

}
console.log("Script loaded");

document.addEventListener('DOMContentLoaded', () =>{
    loadContent();
});

async function loadContent(){
    try{
        const response = await fetch('/api/cities');
        const cities = await response.json();
        console.log(cities);
    }catch(error){
        console.error("Cities couldnt load: ", error);
    }
}
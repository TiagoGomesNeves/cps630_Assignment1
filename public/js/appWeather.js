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
        const response = await fetch(`api/cities/weather/${title}`);

    }catch(error){
        console.error("Error: ", error);
    }
});
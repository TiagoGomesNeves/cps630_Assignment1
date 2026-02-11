document.addEventListener('DOMContentLoaded', () =>{
    loadContent();
});

async function loadContent(){
    try{
        const response = await fetch('/api/cities/title');
        const cities = await response.json();

        const container = document.getElementById('selector');
        const container2 = document.getElementById('selector2');
        cities.forEach(element => {
            let option = document.createElement('option');
            option.value = element;
            option.textContent = element; 
            let option2 = document.createElement('option');
            option2.value = element;
            option2.textContent = element; 
            container.append(option);
            container2.append(option2);
        });
    }catch(error){
        console.error("Error: ", error);
    }
}
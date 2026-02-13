// Store chart instances so we can destroy and re-render when selections change
let popChart = null;
let gdpChart = null;

// When page loads, populate dropdown selectors
document.addEventListener('DOMContentLoaded', () => {
    loadSelectors();
});

// Fetch city titles and load them into both selectors
async function loadSelectors() {
    try {
        const response = await fetch('/api/cities/title');
        const cities = await response.json();

        const sel1 = document.getElementById('selector');
        const sel2 = document.getElementById('selector2');

        cities.forEach(name => {
        sel1.append(new Option(name, name));
        sel2.append(new Option(name, name));
        });

        if (cities.length > 0) sel1.value = cities[0];
        if (cities.length > 1) sel2.value = cities[1];
        else if (cities.length > 0) sel2.value = cities[0];

        sel1.addEventListener('change', updateCompare);
        sel2.addEventListener('change', updateCompare);

        updateCompare();
    } catch (error) {
        console.error("Error loading selectors:", error);
    }
}

// Fetch full city object from API by title
async function fetchCity(title) {
    const res = await fetch(`/api/cities/title/${encodeURIComponent(title)}`);
    if (!res.ok) throw new Error(`City fetch failed: ${title}`);
    return res.json();
}

// Format population to millions with 2 decimal places
function fmtMillions(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "—";
    return (num / 1_000_000).toFixed(2) + " M";
}

// Format GDP to billions with 2 decimal places
function fmtBillions(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "—";
    return (num / 1_000_000_000).toFixed(2) + " B";
}

// Conversion helpers
function toMillions(n) {
    return Number(n) / 1_000_000;
}

function toBillions(n) {
    return Number(n) / 1_000_000_000;
}

// Draw population bar chart using Chart.js
function drawPopChart(labels, data) {
    const ctx = document.getElementById('popChart').getContext('2d');

    // Destroy previous chart before re-rendering
    if (popChart) popChart.destroy();

    popChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Population (Millions)',
                data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Draw GDP bar chart using Chart.js
function drawGdpChart(labels, data) {
    const ctx = document.getElementById('gdpChart').getContext('2d');

    // Destroy previous chart before re-rendering
    if (gdpChart) gdpChart.destroy();

    gdpChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'GDP (Billions)',
                data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Fetch selected cities and update UI + charts
async function updateCompare() {
    const city1 = document.getElementById('selector').value;
    const city2 = document.getElementById('selector2').value;

    const [c1, c2] = await Promise.all([fetchCity(city1), fetchCity(city2)]);

    document.getElementById('popName1').textContent = c1.title;
    document.getElementById('popName2').textContent = c2.title;
    document.getElementById('gdpName1').textContent = c1.title;
    document.getElementById('gdpName2').textContent = c2.title;

    document.getElementById('pop1').textContent = fmtMillions(c1.population);
    document.getElementById('pop2').textContent = fmtMillions(c2.population);
    document.getElementById('gdp1').textContent = fmtBillions(c1.gdp);
    document.getElementById('gdp2').textContent = fmtBillions(c2.gdp);

    const labels = [c1.title, c2.title];

    // Draw updated population chart
    drawPopChart(labels, [
        toMillions(c1.population),
        toMillions(c2.population)
    ]);

    // Draw updated GDP chart
    drawGdpChart(labels, [
        toBillions(c1.gdp),
        toBillions(c2.gdp)
    ]);
}

let params = (new URL(document.location)).searchParams;
if (document.getElementById('title').innerText == "")
    document.getElementById('title').innerText = params.get("t");
// Replace with your own Mapbox Access Token
if (embeddedData == null)
    data = JSON.parse(params.get("l"));
else
    data = embeddedData

mapboxgl.accessToken = 'pk.eyJ1IjoibGljYTg4IiwiYSI6ImNsbmxiZ3prZzBwb2Yyc3BtNGxzNTNzdmEifQ.DVf5b_-9yup8YZFlG5wQeg';
// mapboxgl.accessToken = '';
// Define the list of coordinates (longitude, latitude)
coordinates = data;

let lat = 0;
let lon = 0;
data.forEach(r => {
    lon+=r.lon;
    lat+=r.lat;
});

center = [lon/data.length, lat/data.length];
// Initialize the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // You can choose a different style
    center: center, // Set the initial center of the map
    zoom: 10, // Set the initial zoom level
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());
// Add markers to the map for each coordinate
data.forEach(r => {
    html = ""
    if (r['text']) {
        html+=`
        <p>RRC year: ${r.year}</p>
        <p>${r.text}</p>
        `;
    }
    r.roster.forEach(p => {
        html += `
        <div class="person">
        <div class="image-cropper">
            <img src=${p.photo} alt="Photo of ${p.name}">
        </div>
        <p>${p.name}, Grade ${p.grade}, Race: ${p.race}, Gender: ${p.gender}</p>
        </div>
        `
    })
    new mapboxgl.Marker()
        .setLngLat([r.lon, r.lat])
        .setPopup(new mapboxgl.Popup().setHTML(html))
        .addTo(map);
});
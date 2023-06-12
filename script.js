mapboxgl.accessToken = 'pk.eyJ1IjoiYW5odTQiLCJhIjoiY2xpa3QzaDRxMGE1eDNqcXNicWxkd2lrOCJ9.gPNYo1UVC2UDtdDW0jVCLA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: [138.51199, 38.91961], // starting position [lng, lat]
    zoom: 3 // starting zoom
});
map.on('load', function () {
    map.addLayer(
        {
            id: 'country-boundaries',
            source: {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1',
            },
            'source-layer': 'country_boundaries',
            type: 'fill',
            paint: {
                'fill-color': '#d2361e',
                'fill-opacity': 0.4,
            },
        },
        'country-label'
    );

    map.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3",
        'JPN',
        'KOR',
        'PRK'
    ]);
});
let page_counter = 1;
let location_counter = 0;
let locations_travel = [[127.15226766801361, 35.73760415964543], [126.89993684435218, 35.81966373610457],
[134.83922800523945, 34.72912014988637], [123.95616110458606, 41.91025810415366], [129.60888554992889, 42.46308576314994],
[127.15226766801361, 35.73760415964543]];
let messages = ['<h3>Modern day Jeollabuk-do, one of the regions in the Honam region</h3>',
    '<h3>Gimje-si</h3>', '<h3>Befu-cho</h3>', '<h3>Fushun, one of the regions of Manchukuo which housed coal mines</h3>',
    '<h3>Tumen River, bordering North Korea</h3>', '<h3>Back to the start with Jeollabuk-do in South Korea</h3>'];
let current_markers = [];
let popups = [];
function start() {
    // Removes japan/korea layer
    if (location_counter == 0){
        map.removeLayer('country-boundaries');
        map.removeSource('country-boundaries');
    }
    // Loads new info card
    let scenario = document.getElementsByClassName(`card-${page_counter}`)[0];
    scenario.style.display = "none";
    page_counter += 1;
    let next_card = document.getElementsByClassName(`card-${page_counter}`)[0];
    next_card.style.display = "inline";
    document.querySelector('#start').innerHTML = 'Next';

    // New map location 
    // coordinates
    map.flyTo({
        center: locations_travel[location_counter],
        zoom: 13.5, // Fly to the selected target
        duration: 10000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
    const marker1 = new mapboxgl.Marker()
        .setLngLat(locations_travel[location_counter])
        .addTo(map);
    current_markers.push(marker1);
    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(locations_travel[location_counter])
        .setHTML(messages[location_counter])
        .addTo(map);
    popups.push(popup);
    location_counter += 1;
    if (location_counter == 6){
        document.getElementById("start").style.display = "none";
        document.getElementById("back").style.display = "inline";
    }
}

function back(){
    map.flyTo({
        center: [138.51199, 38.91961],
        zoom: 3, // Fly to the selected target
        duration: 10000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
    map.addLayer(
        {
            id: 'country-boundaries',
            source: {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1',
            },
            'source-layer': 'country_boundaries',
            type: 'fill',
            paint: {
                'fill-color': '#d2361e',
                'fill-opacity': 0.4,
            },
        },
        'country-label'
    );

    map.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3",
        'JPN',
        'KOR',
        'PRK'
    ]);
    let last_page = document.getElementsByClassName(`card-${page_counter}`)[0];
    last_page.style.display = "none";
    if (current_markers!==null) {
        for (let i = current_markers.length - 1; i >= 0; i--) {
            popups[i].remove();
            current_markers[i].remove();
        }
    }
    page_counter = 1;
    location_counter = 0;
    let scenario = document.getElementsByClassName(`card-${page_counter}`)[0];
    scenario.style.display = "inline";
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("back").style.display = "none";
    document.querySelector('#start').innerHTML = 'Click to Start';
}

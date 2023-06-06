mapboxgl.accessToken = 'pk.eyJ1IjoiYW5odTQiLCJhIjoiY2xpa3QzaDRxMGE1eDNqcXNicWxkd2lrOCJ9.gPNYo1UVC2UDtdDW0jVCLA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: [129.51199, 42.91961], // starting position [lng, lat]
    zoom: 10 // starting zoom
});
const marker1 = new mapboxgl.Marker()
.setLngLat([129.51199, 42.91961])
.addTo(map);
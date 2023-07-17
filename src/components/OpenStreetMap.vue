<template>
    <h2>Maps</h2> 
    <button @click="getLocation" id >Your Location</button>
    <button>Path</button>   
    <div id="map"></div>
</template>
  
<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
 
export default {
    name: 'OpenStreetMap',
    data() {
        return {
            markerPath: './marker.png',
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        addMarkers(map) {
            const customIcon = L.icon({
                iconUrl: this.markerPath,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            });

            L.marker([33.567683, 73.141228], { icon: customIcon }).addTo(map);
            L.marker([33.515012, 73.172956], { icon: customIcon }).addTo(map);
        },
        addDirectionLine(map) {
            L.Routing.control({
            waypoints: [
                L.latLng(33.567683, 73.141228),
                L.latLng(33.515012, 73.172956)
            ]
            }).addTo(map);
        },
        initMap() {
            const map = L.map('map').setView([33.567683, 73.141228], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            this.addMarkers(map);
            this.addDirectionLine(map);
        },
        //getLocation(){
          //  console.log("Your location");
        //}
    }
}
</script>
  
<style scoped>
html,
body {
  background-color: #a0c49d;
  height: 100%;
}

#map{
  background-color: #f7ffe5;
  margin: 50px;
  text-align: center;
  height: 650px;
  border-radius: 12px;
}
</style>
  
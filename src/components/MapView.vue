<template>
  <div class="homepage">
    <h1 class="homepage-heading">Map Page</h1>
    <div class="mappage">
      <button class="map-button" @click="showLocation">Show My Location</button>
      <button class="map-button" @click="addMarker">Add Marker</button>
      <button class="map-button" @click="displayLine">Display Line</button>
      <input type="text" v-model="locationName" placeholder="Enter Location Name" />
      <button class="map-button" @click="saveLocation">Save Location</button>
      <p class="homepage-coordinates">
        Latitude: <span id="latitude">{{ latitude }}</span>&deg;<br />
        Longitude: <span id="longitude">{{ longitude }}</span>&deg;
      </p>
      <div class="custom-marker">
        <label for="custom-lat">Latitude:</label>
        <input id="custom-lat" type="number" v-model="customLatitude" step="any" />
        <label for="custom-lng">Longitude:</label>
        <input id="custom-lng" type="number" v-model="customLongitude" step="any" />
        <button class="map-button" @click="addCustomMarker">Add Custom Marker</button>
      </div>
      <div class="map-container">
        <l-map :zoom="zoom" :center="mapCenter" style="width: 100%; height: 400px;">
          <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
          <l-marker v-for="(marker,index) in markers" :key="index" :lat-lng="marker.latLng"></l-marker>
          <l-routing-control :routers="routers" :plan="plan"></l-routing-control>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControlRouting } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default {
  name: 'MapPage',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LRoutingControl: LControlRouting,
  },
  data() {
    return {
      zoom: 10,
      mapCenter: [33.6844, 73.0479],
      tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      latitude: null,
      longitude: null,
      locationName: '',
      markers: [], // Array to store markers
      routers: null,
      plan: null,
      customLatitude: null,
      customLongitude: null,
    };
  },
  methods: {
    async showLocation() {
      if ('geolocation' in navigator) {
        console.log('Geolocation is available');
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.mapCenter = [this.latitude, this.longitude];

          // Add marker at current location
          this.markers.push({
            name: 'My Location',
            latLng: [this.latitude, this.longitude],
          });
        });
      } else {
        console.log('Geolocation is not available');
      }
    },
    addMarker() {
      if (this.latitude && this.longitude && this.locationName) {
        this.markers.push({
          name: this.locationName,
          latLng: [this.latitude, this.longitude],
        });
        this.locationName = '';
      }
    },
    displayLine() {
      if (this.markers.length < 2) {
        console.log('Please add at least two markers to display a line.');
        return;
      }
      const waypoints = this.markers.map(marker => L.latLng(marker.latLng[0], marker.latLng[1]));
      this.plan = L.Routing.plan(waypoints);
      if (!this.routers) {
        this.routers = L.Routing.control({
          waypoints: waypoints,
          routeWhileDragging: true,
        }).addTo(this.$refs.map);
      } else {
        this.routers.setWaypoints(waypoints);
      }
    },
    async saveLocation() {
      if (this.latitude && this.longitude && this.locationName) {
        // Add your code for saving the location here
        console.log('Saving location:', this.locationName, this.latitude, this.longitude);

        // Save the markers to the backend
        try {
          const response = await fetch('http://localhost:3000/save-location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.locationName,
              latitude: this.latitude,
              longitude: this.longitude,
            }),
          });

          if (response.ok) {
            console.log('Location saved successfully');
            // You can display a success message or perform any other action here.
          } else {
            console.error('Failed to save location');
            // You can display an error message or perform any other action here.
          }
        } catch (error) {
          console.error('Error while saving location:', error);
          // You can display an error message or perform any other action here.
        }
      } else {
        console.log('Unable to save location. Latitude, longitude, or location name is missing.');
      }
    },
    addCustomMarker() {
      if (this.customLatitude && this.customLongitude && this.locationName) {
        this.markers.push({
          name: this.locationName,
          latLng: [this.customLatitude, this.customLongitude],
        });
        this.locationName = '';
        this.customLatitude = null;
        this.customLongitude = null;
      }
    },
    async fetchMarkers() {
      try {
        const response = await fetch('http://localhost:3000/get-locations');

        if (response.ok) {
          const markers = await response.json();
          this.markers = markers;
        } else {
          console.error('Failed to fetch locations');
        }
      } catch (error) {
        console.error('Error while fetching locations:', error);
      }
    },
  },
  mounted() {
    // Retrieve the markers from the backend on component mount
    this.fetchMarkers();
  },
};
</script>

<style>
/* Your map component styles here */
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: skyblue; /* Set the background color to blue (#007bff) */
  color: #fff; /* Set the text color to white */
}

.homepage-heading {
  font-size: 40px; /* Increase the font size for the Map heading */
  font-weight: bold;
  margin-bottom: 30px; /* Add some space at the bottom */
  font-family: 'Arial', sans-serif; /* Change to your preferred font-family */
  color: #fff; /* Set the heading text color to white */
}

.homepage-coordinates {
  font-size: 16px; /* Increase the font size for the coordinates */
}

.mappage {
  display: flex; /* Change the display property to flex */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center Horizontally */
  flex-wrap: wrap; /* Wrap the buttons to the next line if there's not enough space */
}

.mappage button {
  background-color: #007bff; /* Set the background color to blue (#007bff) */
  color: #fff; /* Set the text color to white */
  font-size: 15px; /* Increase the font size */
  font-weight: bold;
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center Horizontally */
  padding: 0; /* Remove the padding to create a small cube appearance */
  border: none; /* Remove the default button border */
  border-radius: 0; /* Set border-radius to zero to make it a square */
  cursor: pointer; /* Change the cursor to a pointer when hovering over the button */
  transition: background-color 0.3s ease; /* Add a smooth transition effect for background color */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow for a 3D effect */
  margin-right: 1rem; /* Add a little margin to the right */
  margin-left: 1rem;
  margin-bottom: 1rem; /* Add some space at the bottom */
}

.mappage button:hover {
  background-color: #0056b3; /* Change the background color on hover */
}

.custom-marker {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.custom-marker label {
  margin-right: 0.5rem;
  color: #fff;
}

.custom-marker input {
  width: 8rem;
  padding: 0.5rem;
  font-size: 14px;
}

.custom-marker button {
  margin-left: 1rem;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
}
</style>




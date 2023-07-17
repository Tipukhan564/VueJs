<template>
  <h2>Maps</h2> 
  <button @click="getLocation" id >Your Location</button>
  <button>Path</button>
  <div id="map">
  </div>
</template>

<script>

/* global google */

export default {
  name: 'MapView',
  data() {
    return {
      long: 73.141228,
      lat: 33.567683,
      location : [],
      map: null,
    };
  },
  mounted() {
    this.loadGoogleMapsAPI().then(()=> {
      this.initMap()
    });
  },
  methods: {
    loadGoogleMapsAPI() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://maps.google.com/maps/api/js?sensor=false';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    initMap() {
      let bounds = new google.maps.LatLngBounds();
      console.log(this.long);
      console.log(this.lat);
      this.addLocation();
      var lattlong = new google.maps.LatLng(this.lat, this.long);
      var options = {
        center: lattlong,
        zoom: 15,
        mapTypeControl: true,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL,
        },
      };
      this.map = new google.maps.Map(document.getElementById('map'), options);
      new google.maps.Marker({
        position: lattlong,
        map: this.map,
        title: 'Is This You?',
      });

      for (let index = 0; index < this.location.length; index++) {
        let nmarker = new google.maps.Marker({
          position: new google.maps.LatLng(this.location[index].latitude, this.location[index].longitude),
          map: this.map,
          title: this.location[index].title
        });

        bounds.extend(nmarker.position);
      }
      if(this.location.length>1){
        this.map.fitBounds(bounds);
      }
      

      this.addDirections(new google.maps.LatLng(this.location[0].latitude, this.location[0].longitude), new google.maps.LatLng(this.location[1].latitude, this.location[1].longitude));
    },
    addDirections(from, to){
      let service = new google.maps.DirectionsService();
      let renderer = new google.maps.DirectionsRenderer();

      service.route({
        origin: from,
        destination: to,
        travelMode: 'DRIVING'
      },
      function (response, status) {
        if(status === 'OK'){
          renderer.setDirections(response);

          renderer.setMap(this.map);
        }
        else{
          console.log('Directions request failed due to ' + status);
        }
      });
    },
    addLocation(){
        this.location.push({"latitude": 33.567683, "longitude": 73.141228, "title" : "Pickup"});
        this.location.push({"latitude": 33.515012, "longitude": 73.172956, "title" : "DropOff"});
    },
    showLoc(pos) {
      this.long = pos.coords.longitude;
      this.lat = pos.coords.latitude ;
      this.initMap();
      
    },
    handleError(error){
      console.log("error message: " + error.message);
    },
    getLocation() {
      if (navigator.geolocation) {
        let options ={
          enableHighAccuracy : true,
          timeout: 10000,
          maximumAge: 300000
        };
        navigator.geolocation.watchPosition(this.showLoc, this.handleError, options);
      }
    },
  },
};
</script>

<style>
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

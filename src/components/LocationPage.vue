<template>
    <div id = "location">
        <h1>
            Find your Location
        </h1>
        <br />
        <button @click="getlocation">Find</button>
        <div v-if = "display">
          <h3>Longitude : {{long}}</h3>
          <h3>Latitude : {{lat}}</h3>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'LocationPage',
  data() {
    return {
      long: '',
      lat: '',
      display : false,
      
    };
  },
  methods: {
    showLoc(pos){
      this.long = pos.coords.longitude;
      this.lat = pos.coords.latitude
      this.display = true;
    },
    getlocation(){
      navigator.geolocation.getCurrentPosition(this.showLoc);  
    },
  },
};

</script>

<style>
html,
body {
  background-color: #a0c49d;
}

#location {
  background-color: #f7ffe5;
  margin: 150px;
  text-align: center;
  height: 350px;
  border-radius: 12px;
}

#displayloc{
  height: 100%;
}

</style>
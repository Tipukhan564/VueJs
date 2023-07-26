<template>
  <div class="homepage"> <!-- Added the class "homepage" -->
    <img class="logo" src="@/assets/1.jpg" alt="Logo" />
    <h1 class="homepage-heading">Welcome to Home, Muhammad!</h1> <!-- Added the class "homepage-heading" -->
    <p class="homepage-ip">Your IP Address: {{ ipAddress }}</p> <!-- Added the class "homepage-ip" -->
    <button class="map-button" @click="goToMap">Go to Map</button> <!-- Added the map button -->
  </div>
</template>


<script>
export default {
  name: 'HomePage',
  data() {
    return {
      ipAddress: null,
    };
  },
  async mounted() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      this.ipAddress = data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  },
  methods: {
    goToMap() {
      // Add your code to navigate to the MapPage here
      this.$router.push('/map'); // Replace '/map' with the actual route path for the MapPage
    },
  },
};
</script>


<style>
/* Your home component styles here */
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: skyblue; /* Set the background color to blue (#007bff) */
  color: #fff; /* Set the text color to white */
}

.home-heading {
  font-size: 30px; /* Increase the font size for the heading */
  font-weight: bold;
  margin-bottom: 30px; /* Add some space at the bottom */
  font-family: 'Arial', sans-serif; /* Change to your preferred font-family */
}

.homepage-ip {
  font-size: 20px; /* Increase the font size for the IP address */
  margin-bottom: 10px;
}

.logo {
  width: 100px; /* Adjust the width and height as per your logo's dimensions */
  height: 100px;
  margin-bottom: 20px; /* Add some space between the logo and input fields */
  border-radius: 50%; /* Optional: Apply border-radius to make it a circle */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px
}
/* Add the styles for the input elements used in the login component */
.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

/* Add the styles for the login button used in the login component */
.login button {
  width: 300px;
  height: 40px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
}
.map-button {
  background-color: #007bff; /* Set the background color to blue (#007bff) */
  color: white; /* Set the text color to white */
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
  margin: 0 auto;
}

.map-button:hover 
{
  background-color: #0056b3; /* Change the background color on hover */
}

/* Add any other login component styles you want to apply to the Home page */
</style>

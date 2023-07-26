<template>
  <div class="login-container">
    <h1 class="login-heading">Login</h1>
    <div class="login">
      <img class="logo" src="@/assets/1.jpg" alt="Logo" />
      <input type="text" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button class="login-button" @click="login">Login</button>
      <p>
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });
        const data = response.data;
        console.log('response is '+data);
        if (data) {
          // Successful login
          //localStorage.setItem('user-info', JSON.stringify(response.data));
          this.$router.push('/home');
        } else {
          // Failed login
          this.loginError = response.data.message;
        }
      } catch (error) {
        console.error(error);
        this.loginError = 'An error occurred during login. Please try again later.';
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: skyblue; /* Set the background color to match skyblue */
}

.login-heading {
  font-size: 40px; /* Increase the font size for the Login heading */
  font-weight: bold;
  color: #fff; /* Set the color to white */
  margin-bottom: 30px; /* Add some space at the bottom */
  font-family: 'Arial', sans-serif; /* Change to your preferred font-family */
}

/* ... existing styles ... */

.logo {
  width: 100px; /* Adjust the width and height as per your logo's dimensions */
  height: 100px;
  margin-bottom: 20px; /* Add some space between the logo and input fields */
  border-radius: 50%; /* Optional: Apply border-radius to make it a circle */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
}

.login-button {
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

.login-button:hover {
  background-color: #0056b3; /* Change the background color on hover */
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>




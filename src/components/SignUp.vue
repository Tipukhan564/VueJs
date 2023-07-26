<template>
  <div class="login-container">
    <h1 class="login-heading">Sign Up</h1>
    <div class="login">
      <img class="logo" src="@/assets/1.jpg" alt="Logo" /> <!-- Replace with actual logo file path -->
      <input type="text" v-model="username" placeholder="Username" />
      <input type="text" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button class="login-button" @click="signup">Sign Up</button>
      <p>
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUpPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signup() {
      try {
        console.log('works');
        let response = await axios.post('http://localhost:3000/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log(response);
        if (response.status === 200) {
          // Successful signup
          this.$router.push({ name: 'L6ogin' });
        }
      } catch (error) {
        console.log('error after backend call');
        console.error(error);
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
  font-size: 40px; /* Increase the font size for the Sign Up heading */
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
  justify-content: center; /* Center horizontally */
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

/* Additional styles to match Login.vue */
.signup-container {
  background-color: #f7f7f7; /* Set the background color to match the Login container */
}

.signup {
  margin-top: 20px; /* Add some space at the top to match Login container */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup p {
  color: #333; /* Change the text color to match the Login container */
}

.signup p a {
  color: #007bff; /* Change the link color to match the Login container */
  text-decoration: none; /* Remove underline for the link */
}

.signup p a:hover {
  text-decoration: underline; /* Add underline on hover for the link */
}
</style>

this is the signup code
<template>
  <div>
    <img class="logo" src="../assets/resto-logo.jpg" />
    <h1>Sign Up</h1>
    <div class="register">
      <input type="text" v-model="name" placeholder="Enter Name" />
      <input type="text" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button v-on:click="signUp">Sign Up</button>
      <p>
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signUp() {
      console.log('Registration successful');
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      try {
        const response = await axios.post('http://localhost:8082/reg', {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        console.warn(response);
        if (response.status === 201) {
          localStorage.setItem('user-info', JSON.stringify(response.data));
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        console.error(error);
      }
      this.name = '';
      this.email = '';
      this.password = '';
    },
    goToLogin() {
      this.$router.push('/Login');
    },
  },
};
</script>
<style>
.logo {
  width: 100px;
}
.register input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
</style>

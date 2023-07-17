<template>
    <div>
      <img class="logo" src="../assets/resto-logo.jpg" />
      <h1>Login</h1>
      <div class="login">
        <input type="text" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button v-on:click="login">Login</button>
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        console.log('Login attempt');
        console.log('Email:', this.email);
        console.log('Password:', this.password);
  
        try {
          const response = await axios.post('http://localhost:8082/login', {
            email: this.email,
            password: this.password,
          });
          console.warn(response);
          if (response.status === 200) {
            localStorage.setItem('user-info', JSON.stringify(response.data));
            this.$router.push({ name: 'Home' });
          }
        } catch (error) {
          console.error(error);
        }
        this.email = '';
        this.password = '';
      },
      goToSignUp() {
        this.$router.push('/signup');
      },
    },
  };
  </script>
  
  <style>
  .logo {
    width: 100px;
  }
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
  </style>
  
<template>
  <div id="app">
    <h1> Muhammad App</h1>
    <RegistrationForm />
    <LoginForm />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  </div>
</template>

<script>
import RegistrationForm from './components/SignUp.vue'; // Correct the path
import LoginForm from './components/Login.vue'; // Correct the path

export default {
  name: 'App',
  components: {
    RegistrationForm,
    LoginForm,
  },
};
</script>

<style>
/* Add any app-wide styles here */
</style>

<template>
  <div>
    <h1>Welcome to Home, Muhammad!</h1>
    <p>Your IP Address: {{ ipAddress }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage', // Change the component name to "HomePage"
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
};
</script>


<style>
/* Your home component styles here */
h1 {
  /* Add the styles for the h1 element */
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

p {
  /* Add the styles for the p element */
  font-size: 16px;
  color: #666;
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

/* Add any other login component styles you want to apply to the Home page */
</style>


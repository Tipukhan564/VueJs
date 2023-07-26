import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue' // Fix the component name to "SignUp"
import HomePage from './components/HomePage.vue' // Fix the component name to "HomePage"
//import LocationPage from './components/LocationPage.vue' // Fix the component name to "LocationPage"
import MapView from './components/MapView.vue' // Fix the component name to "MapView"
import OpenStreetMap from './components/OpenStreetMap.vue' // Fix the component name to "OpenStreetMap"

//creating routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: Login },
    { path: '/signup', component: SignUp, name: SignUp }, // Use the correct component name "SignUp"
    { path: '/home', component: HomePage }, // Use the correct component name "HomePage"
    { path: '/map', component: MapView }, // Use the correct component name "MapView"
    { path: '/openstreet', component: OpenStreetMap }, // Use the correct component name "OpenStreetMap"
  ],
});

//creating the app using the routes defined
const app = createApp(App);
app.use(router);
app.mount('#app');









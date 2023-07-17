const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; // Choose your preferred port number
const { networkInterfaces } = require('os');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ZiiApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up middleware and routes
app.use(express.json());
app.use(cors());


const User = require('./user');

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Create a new user document
  const user = new User({ username, email, password });

  // Save the user to the database
  user.save()
    .then(() => {
      res.status(200).json({ message: 'Registration successful' });
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).json({ message: 'Error registering user' });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are valid
  User.findOne({ username, password })
    .then(user => {
      if (user) {
        // Credentials are valid
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ success: false, message: 'Invalid username or password. Please try again.' });
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login. Please try again later.' });
    });
});

function getPrivateIP() {
  const interfaces = networkInterfaces();

  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const iface of interface) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return '';
}

app.get('/private-ip', (req, res) => {
  const privateIP = getPrivateIP();
  res.json({ privateIP });
});
/*
var name = document.getElementById("displayloc");
function getlocation(navigator.geolocation.getCurrentPosition(sjo))

app.get('/location', (req, res)=>{

  const text = "Latitude: " + postMessage.coords.latitude +"<br>Longitude: "+postMessage.coords.longitude;
  res.json({text});
});
*/

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

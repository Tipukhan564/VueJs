const cors = require('cors');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up middleware and routes
app.use(express.json());
app.use(cors());

// Helper function to check if a user exists in the users.txt file
function checkUserCredentials(email, password) {
  const data = fs.readFileSync('users.txt', 'utf8');
  const users = data.split('\n');
  return users.some(user => {
    const [savedUsername, savedEmail, savedPassword] = user.split(',');
    return savedEmail.trim() === email.trim() && savedPassword.trim() === password.trim();
  });
}

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Save the user data to the file
  fs.appendFile('users.txt', `${username},${email},${password}\n`, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ message: 'Error writing data to file' });
      return;
    }
    res.status(200).json({ message: 'Data written to file successfully' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email recieved at start is '+email+' '+password);
  // Check if the user exists in the users.txt file
  const userExists = checkUserCredentials(email, password);
  console.log('User Exists: '+userExists);
  if (userExists) {
    // Credentials are valid
    console.log('status: successful');
    res.status(200).json(true);
  } else {
    // Invalid credentials
    console.log('status: unsuccessful');

    res.status(401).json(false);
  }
});

function getPrivateIP() {
  const interfaces = require('os').networkInterfaces();

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




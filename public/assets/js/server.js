// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // This line serves the static files (HTML, CSS, JS) from the 'public' directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html')); 
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// API routes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  // Logic for saving new note
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

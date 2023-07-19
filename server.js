// Imports express, path, notes.js file, and sets listening PORT
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const api = require('./public/routes/notes');

const app = express();

// Allows app to use json, or urlencoded objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows app to use the folders/files in the public folder
app.use(express.static('public'));

// Sets /api as endpoint for notes.js file
app.use('/api', api);

// Creates route for notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Directs to index.html file for any endpoint not previously defined
app.get('*', (req, res) => (
    res.sendFile(path.join(__dirname, '/public/index.html'))
));

// Allows app to listen at PORT for Heroku environment, or PORT 3001
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
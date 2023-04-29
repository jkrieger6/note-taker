const express = require('express');
const app = express();
const PORT = 3001;


const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static("public"));

// Listener to connect to server
app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html")));

// GET request to retrieve notes
app.get("/public/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
    console.log("GET request received")
});

// Listener to connect to port
app.listen(PORT, () =>
console.log(`App listening att http://localhost:${PORT} 🚀`)
);

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



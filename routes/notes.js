const express = require("express");
const app = express();
const path = require("path");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET route for retrieving all the notes from db.json file
app.get("/notes", (req, res) => {
    res.readFromFile("./develop/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for adding notes and giving them a unique id using uuid node package
app.post("/notes", (req, res) => {
    // Logs that the POST request was received
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid.v4(),
        };

        readAndAppend(newNote, "./develop/db.json");

        const response = {
            status: "success",
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json("Error in posting note");
    }
});
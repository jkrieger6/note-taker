const notes = require("express").Router();
const uuid = require("/helpers/uuid");
const path = require("path");

// Sets up the Express app to handle data parsing
notes.use(express.urlencoded({ extended: true }));
notes.use(express.json());

// GET route for retrieving all the notes from db.json file
notes.get("/notes", (req, res) => {
    res.readFromFile("./develop/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for adding notes and giving them a unique id using uuid node package
notes.post("/notes", (req, res) => {
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
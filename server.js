const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const uuid = require('/public/assets/helpers/uuid.js');


const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route to connect to server and retrieve notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});


// GET route to retrieve notes from db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});
// POST request to add notes and give them a unique id using uuid node package
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid.v4(),
        };
        // Convert data into a string so it can be saved
        const reviewString =JSON.stringify(newNote);
        // Add string to a file
        fs.readFile("./db/db.json", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                fs.writeFile(".db/db.json",
                JSON.stringify(parsedNotes, null,),
                (writeErr) =>
                writeErr
                ? console.error(writeErr)
                : console.info("Successfully updated notes!")
                );
            }
    });
    const response = {
        status: "success",
        body: newNote,
    };
    console.log(response);
    res.json(response);
} else {
    res.json("Error in creating note");
}
});

// DELETE method to delete notes that have been aded(bonus points)
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            const newNotes = parsedNotes.filter((note) => note.id !== id);
            fs.writeFile("./db/db.json",
            JSON.stringify(newNotes, null, 4),
            (writeErr) =>
            writeErr
            ? console.error(writeErr)
            : console.info("Successfully deleted note!")
            );
        }
    });
    const response = {
        status: "success",
        body: id,
    };
    console.log(response);
    res.json(response);
});

// Listener to connect to port
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);

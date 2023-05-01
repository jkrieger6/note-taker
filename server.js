const express = require('express');
const app = express();
const PORT = 3001;


const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Listener to connect to server and retrieve notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});


// API routes
app.get('/api/notes', (req, res) => {
    const notes =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
})
// POST request to add notes
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
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

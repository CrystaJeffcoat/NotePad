const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// create GET http route to /notes to get notes.html file
app.get("/notes", function(req, res) {
    res.sendFile("public/notes.html", {root: __dirname });
});

// create GET http route to * to get index.html file
app.get("/", function(req, res) {
    res.sendFile("public/index.html", {root: __dirname });
});

// create GET /api/notes
app.get("/api/notes/", function(req, res) {

    readDataBase(function(err, data) {

        res.json(data);
       
    });
}); 

// create POST
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    addToFile(newNote);
    res.end();
});

app.delete("/api/notes/:id", function(req, res) {
    let chosen = req.params.id;

    readDataBase(function(err, data) {
        newData = data.filter(function(obj) {
            return obj.id !== parseInt(chosen);
        });
        writeDataBase(newData);
    });
    res.end();
});

// store and retrieve notes from db.json using fs module
function addToFile(newNote) {
    let allNotes = [];
    readDataBase(function(err, data) {
        if (data.length > 0) {
            allNotes = data;
        };
        allNotes.push(newNote);
        writeDataBase(allNotes);
    });
};

// read db file and get back array of data when called
function readDataBase(callback) {
    fs.readFile("db/db.json", function(err, data) {
        if (err) {
            console.log(err)
        };
        if (data.length > 0) {
            let notesString = data.toString("utf-8");
            let notesJSON = JSON.parse(notesString);
            for (i = 0; i < notesJSON.length; i++) {
                let note = notesJSON[i]
                note.id = i;
            };
            callback(null, notesJSON);
        } else callback(null, data);
    });
};

// write to database 
function writeDataBase(data) {
    fs.writeFile("db/db.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        };
    });
}

// connect to the server
app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});
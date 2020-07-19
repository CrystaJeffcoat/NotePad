const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const { networkInterfaces } = require("os");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

var allNotes = [];

// create GET http route to /notes to get notes.html file
app.get("/notes", function(req, res) {
    res.sendFile("public/notes.html", {root: __dirname });
});

// create GET http route to * to get index.html file
app.get("/", function(req, res) {
    res.sendFile("public/index.html", {root: __dirname })
});

// store and retrieve notes from db.json using fs module
addToFile({ title: 'mnv', text: 'kjf' });
function addToFile(newNote) {
    fs.readFile("db/db.json", function(err, data) {
        if (data.length > 0) {
            let notesString = data.toString("utf-8");
            let notesJSON = JSON.parse(notesString);
            allNotes = notesJSON;
            console.log(allNotes);
            allNotes.push(newNote);
            console.log(allNotes);

            fs.writeFile("db/db.json", JSON.stringify(allNotes), function(err) {
                if (err) {
                    console.log(err);
                };
            });
        } else {
            allNotes.push(newNote);
            console.log(allNotes)
            fs.writeFile("db/db.json", JSON.stringify(allNotes), function(err) {
                if (err) {
                    console.log(err);
                };
            });
        };
    });
};

// create GET /api/notes
app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", function(err, allNotes) {
        //res.writeHead(200);
        let notesString = allNotes.toString("utf-8");
        let notesJSON = JSON.parse(notesString);
        res.json(notesJSON);
    });
}); 

// create POST
app.post("/api/notes", function(req, res) {

    let newNote = req.body;
    addToFile(newNote);

});

// connect to the server
app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});
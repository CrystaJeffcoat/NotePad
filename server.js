const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

// create GET http route to /notes to get notes.html file
app.get("/notes", function(req, res) {
    res.sendFile("public/notes.html", {root: __dirname });
});

// create GET http route to * to get index.html file
app.get("/", function(req, res) {
    res.sendFile("public/index.html", {root: __dirname })
});

// store and retrieve notes from db.json using fs module

// create GET /api/notes 
// read from db.json file and return all saved notes as JSON

// create POST 


// connect to the server
app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});
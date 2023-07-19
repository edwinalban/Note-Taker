// Imports express, uuid, and functions from fsUtils.js in helpers folder
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');

// Creates route to allow db.json file to be read and parsed in order to return all saved notes
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

// Creates route to delete note after selected by unique id
notes.delete('/notes/:id', (req, res) => {
    const requestedNote = req.params.id;

    readFromFile('./db/db.json').then((data) => {
        let parsedNotes = JSON.parse(data);
        let filteredNotes = parsedNotes.filter((note) => {
            return note.id !== requestedNote
        })
        return filteredNotes
    })
        .then((filteredNotes) => {
            writeToFile('./db/db.json', filteredNotes)
        })
        .then(() => res.json({ message: "success" }))
});

// Creates route to allow updates to db.json file for new notes
notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit note`);

    const { title, text } = req.body;

    if (title && text) {
        const newPayload = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(newPayload, './db/db.json');

        const response = {
            status: 'success',
            body: newPayload,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

// Exports routes for use in server.js file
module.exports = notes;
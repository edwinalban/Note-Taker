const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../../helpers/fsUtils');

notes.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to submit note`);

    const { title, text } = req.body;

    if (title && text) {
        const newPayload = {
            title,
            text,
            uuid: uuidv4()
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

module.exports = notes;
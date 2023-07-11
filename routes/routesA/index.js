const fs = require('fs');
const db = require('../../db/db.json')
const router = require('express').Router();
const uniqid = require('uniqid');

//Get request in api notes if successful sends read file 
router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        res.send(data)
    })
})
//Post Request to body for new note  
router.post('/api/notes', (req, res) => {
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }
    
    //1. use fs to read the db.json
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let newData = JSON.parse(data);

        newData.push(newNote);
        console.log(newData)

        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            if (err) throw err;

            res.send('successfully added');
        })
    });

})

module.exports = router;
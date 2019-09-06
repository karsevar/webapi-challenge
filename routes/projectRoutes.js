const express = require('express');
const db = require('../data/helpers/actionModel.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    db.get()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.get('/:id', validateId, (req, res) => {
    db.get(req.params.id) 
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

// middleware:
function validateId(req, res, next) {
    db.get(req.params.id) 
        .then(results => {
            if(typeof results === 'object') {
                console.log(`${req.params.id} is an object`)
                next();
            } else {
                res.status(400).json({ message: "invalid project id" })
            }
        })
}

module.exports = router;
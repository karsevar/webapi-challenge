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

router.get('/:id', (req, res) => {
    db.get(req.params.id) 
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;
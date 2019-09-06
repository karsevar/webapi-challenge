const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js')

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    actionDb.get() 
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.get('/:id', validateId, (req, res) => {
    actionDb.get(req.params.id) 
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.post('/', validatePost, (req, res) => {
    actionDb.insert(req.body) 
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


// Middleware 
function validatePost(req, res, next) {
    if(req.body.notes && req.body.description) {
        console.log(`Length of the description ${req.body.description.length}`)
        if(req.body.description.length <= 128) {
            next();
        } else {
            res.status(400).json({message: "description field needs to be less than 128 characters"})
        }
    } else {
        res.status(400).json({message: "missing required description or notes field"})
    }
}

function validateId(req, res, next) {
    actionDb.get(req.params.id) 
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
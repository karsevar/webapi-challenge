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

router.post('/', validateProjectId, validatePost, (req, res) => {
    actionDb.insert(req.body) 
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.delete('/:id', validateId, (req, res) => {
    actionDb.remove(req.params.id) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.put('/:id', validateId, validatePut, (req, res) => {
    actionDb.update(req.params.id, req.body) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


// Middleware 
function validatePut(req, res, next) {
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

function validatePost(req, res, next) {
    if(req.body.notes && req.body.description && req.body.project_id) {
        console.log(`Length of the description ${req.body.description.length}`)
        if(req.body.description.length <= 128) {
            next();
        } else {
            res.status(400).json({message: "description field needs to be less than 128 characters"})
        }
    } else {
        res.status(400).json({message: "missing required description, notes, or project id field"})
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

function validateProjectId(req, res, next) {
    projectDb.get(req.body.project_id) 
        .then(results => {
            if(results === null) {
                res.status(400).json({message: "invalid project id"})
            } else {
                next();
            }
        })
}

module.exports = router;
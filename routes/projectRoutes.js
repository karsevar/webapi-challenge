const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js')

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    projectDb.get()
        .then(results => {
            res.status(200).json(results) 
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    projectDb.get(req.params.id) 
        .then(results => {
            res.status(200).json(results) 
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.post('/', validateProjectPost, (req, res) => {
    projectDb.insert(req.body) 
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    projectDb.remove(req.params.id) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.put('/:id', validateProjectId, validateProjectPost, (req, res) => {
    projectDb.update(req.params.id, req.body) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.get('/actionproject/:id', validateProjectId, (req, res) => {
    projectDb.getProjectActions(req.params.id) 
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

// middleware:

function validateProjectId(req, res, next) {
    projectDb.get(req.params.id) 
        .then(results => {
            if(results === null) {
                res.status(400).json({message: "invalid project id"})
            } else {
                next();
            }
        })
}

function validateProjectPost(req, res, next) {
    if(req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({message: "missing required description or name field"})
    }
}



module.exports = router;
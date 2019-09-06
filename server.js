const express = require('express');
const projectRoutes = require('./routes/projectRoutes.js')

const server = express();

server.use('/projects', projectRoutes)

server.use('/', (req, res) => {
    res.send('Sprint homepage');
});

module.exports = server;
const express = require('express');

const server = express();

server.use('/', (req, res) => {
    res.send('Lets write some middleware');
});

module.exports = server;
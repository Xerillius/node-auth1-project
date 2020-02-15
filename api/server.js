const express = require('express');


const apiRouter = require('./api-router.js');

const server = express();
const helmet = require('helmet');
const cors = require('cors');
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);

module.exports = server;
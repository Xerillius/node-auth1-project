const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const apiRouter = require('./api-router.js');

const server = express();

const sessionConfig = {
    name: "nauth1p",
    secret: "nodeauth1project",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api', apiRouter);

module.exports = server;
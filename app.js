#!/bin/env node

/**
 * Module dependencies.
 */
var express = require('express');
var io = require('socket.io');
var ultimate_server = require('./server');
var log_access_actions = require('./actions/log_access');
var login_actions = require('./actions/login');
var list_actions = require('./actions/list');
var chat_actions = require('./actions/chat');
var bj_actions = require('./actions/bj');

//var server = new ultimate_server.server('localhost-dev-env');
var server = new ultimate_server.server();

// All routes must be placed here.

// Access Log
//server.app.get('/*', log_access_actions.do_log);
server.app.get('/', login_actions.get_page);
server.app.get('/login', login_actions.get_page);
server.app.get('/list', list_actions.get_page);
server.app.post('/list', list_actions.post_page);
server.app.get('/bj', bj_actions.get_page);

server.start();

// Initiate chat comet
var chat_comet = io.listen(server.http_server)
    .of("/chat")
    .on('connection', chat_actions.on_connection);
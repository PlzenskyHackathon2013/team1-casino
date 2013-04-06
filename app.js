#!/bin/env node

/**
 * Module dependencies.
 */
var express = require('express');
var io = require('socket.io');
var server = require('./http_server');
var log_access_actions = require('./actions/log_access');
var login_actions = require('./actions/login');
var list_actions = require('./actions/list');
var chat_actions = require('./actions/chat');
var bj_actions = require('./actions/bj');

var http_server = new server.http_server;

//http_server.app.set('env', 'localhost-dev-env');
http_server.initialize();

// All routes must be placed here.

// Access Log
//http_server.app.get('/*', log_access_actions.do_log);
http_server.app.get('/', login_actions.get_page);
http_server.app.get('/login', login_actions.get_page);
http_server.app.get('/list', list_actions.get_page);
http_server.app.post('/list', list_actions.post_page);
http_server.app.get('/bj', bj_actions.get_page);

http_server.start();

// Initiate chat comet
var chat_comet = io.listen(http_server.app)
    .of('/chat')
    .on('connection', chat_actions.on_connection);

#!/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var server = require('./http_server');
var login_routes = require('./routes/login');
var list_routes = require('./routes/list');

var http_server = new server.http_server;
//http_server.app.set('env', 'localhost-dev-env');
http_server.initialize();

// All routes must be placed here.
http_server.app.get('/', login_routes.get_page);
http_server.app.get('/login', login_routes.get_page);
http_server.app.get('/list', list_routes.get_page);

http_server.start();

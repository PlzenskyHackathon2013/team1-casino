#!/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var server = require('./http_server');
//var routes = require('./routes');
//var user = require('./routes/user');

var http_server = new server.http_server;
http_server.initialize();

// All routes must be placed here.
//http_server.app.get('/', routes.index);
//http_server.app.get('/users', user.list);

http_server.start();

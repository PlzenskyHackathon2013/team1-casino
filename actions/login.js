/**
 * Module dependencies.
 */
var fs = require('fs');

/*
 * GET login page.
 */
exports.get_page = function(req, res){
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync('./html/login.html'));
};

/**
 * Module dependencies.
 */
var fs = require('fs');

/*
 * GET list page.
 */

exports.get_page = function(req, res){
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync('./html/list.html'));
};

exports.post_page = function(req, res){

    if(req.body.nick == 'cervotoc') // je validni nick
    {
      res.cookie('id', 'cervotoc');
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/list.html'));
    } else
    {
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/login.html'));
    }
};
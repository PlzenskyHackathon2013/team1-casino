/**
 * Module dependencies.
 */
var fs = require('fs');

/*
 * GET list page.
 */

exports.get_page = function(req, res){

    //if(isValidID(req.cookies.id)) { // kontrola validniho hrace 
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/list.html'));
    //} else
    /*
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/login.html'));
    */
};

exports.post_page = function(req, res) {
    var result = req.body.nick.match(/^([a-z0-9A-Z]{3,15})$/);
    if(result !== null)
    {
      //res.cookie('id', getPlayerID(req.body.nick));
      res.cookie('nick', req.body.nick);
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/list.html'));
    } else
    {
      res.set('Content-Type', 'text/html');
      res.send(fs.readFileSync('./html/login.html'));
    }
};
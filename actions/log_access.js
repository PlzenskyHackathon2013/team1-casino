/**
 * Module dependencies.
 */
var fs = require('fs');

/*
 * Login Http access
 */
exports.do_log = function(req, res, next) {
    if ('localhost-dev-env' === self.app.get('env')) {
        console.log(req.session);
    }
    next();
};

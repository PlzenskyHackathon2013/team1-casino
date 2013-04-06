/**
 * Module dependencies.
 */
var express = require('express')
  , fs      = require('fs')
  , path    = require('path');

/**
 * Http server
 */
var http_server = function() {

    //  Scope.
    var self = this;

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        if ('localhost-dev-env' === self.app.get('env')) {
            console.warn('Development environment, using 127.0.0.1');
            
            self.app.use(express.logger('dev'));
            self.app.use(express.errorHandler());
            
            self.ipaddress = "127.0.0.1";
            self.port      = 8080;
        } else {
            //  Set the environment variables we need.
            self.ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
            self.port      = process.env.OPENSHIFT_INTERNAL_PORT || 8080;
        };
        
        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating http server ...',
                       Date(Date.now()), sig);
           process.exit(1);
        };
        console.log('%s: Http server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app.set('views', __dirname + '/views');
        self.app.set('view engine', 'jade');
        self.app.use(express.favicon());
        self.app.use(express.bodyParser());
        self.app.use(express.methodOverride());
        self.app.use(express.cookieParser());
        var store = new express.session.MemoryStore;
        self.app.use(express.session({ secret: 'whatever', store: store }));
        self.app.use(self.app.router);
        self.app.use('/public', express.static(path.join(__dirname, 'public')));
    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        // Create the express server and routes.
        self.initializeServer();
    };

    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Http server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

    self.app = express();
}

exports.http_server = http_server;
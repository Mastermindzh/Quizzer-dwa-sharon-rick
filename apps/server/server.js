'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');

var mongoose = require('./modules/mongoose.js');

var App = Express();

var Server = Http.createServer(App);

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yml'),
    handlers: Path.resolve('./handlers')
}));

Server.listen(8080, function() {
    this.reconnectTries = 60;
    this.reconnectInterval = 1000;

    App.swagger.api.host = this.address().address + ':' + this.address().port;
    console.log('App running on %s:%d', this.address().address, this.address().port);
});
'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');

var io = require('socket.io')(Http);
var App = Express();
var Server = Http.Server(App);

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
  extended: true
}));

// we need CORS because we're working from other domains (e.g react runs from your pc)
io.origins('*:*');
App.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

App.use(Swaggerize({
  api: Path.resolve('./config/swagger.yml'),
  handlers: Path.resolve('./handlers')
}));

var privateQuiz = io.of("/my-private-quiz");

App.get('/websocketTestCall', (req, res) => {
  privateQuiz.emit('new-question','this is the new question')
  res.send('websocket message fired!')
});

privateQuiz.on('connection', function(client){
  console.log('a client connected');
  client.on("disconnect", () => console.log("a client disconnected"));
});

Server.listen(8080, function () {
  App.swagger.api.host = this.address().address + ':' + this.address().port;
  console.log('App running on %s:%d', this.address().address, this.address().port);
});

io.listen(Server);

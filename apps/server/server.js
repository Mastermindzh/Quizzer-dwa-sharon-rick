'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var fs = require('fs');

var io = require('socket.io')(Http);
var App = Express();
var Server = Http.Server(App);

/**Multer setup */
const uploadPath = './images';
var multer  = require('multer');
var mime = require('mime-types') // we need to know what type they uploaded
var crypto = require('crypto'), // used to generate unique filenames
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
// define diskstorage things
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });
// static endpoint for images
App.use(Express.static('./images'));

// other middleware
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

// Custom endpoints
App.post('/image', upload.single('teamImage'), function (req, res, next) {
  res.send(req.file.filename);
})

var privateQuiz = io.of("/my-private-quiz");

App.get('/websocketTestCall', (req, res) => {
  privateQuiz.emit('new-question','this is the new question')
  res.send('websocket message fired!')
});

privateQuiz.on('connection', function(client){
  console.log('a client connected');
  client.on("disconnect", () => console.log("a client disconnected"));
});

// start server(s) and listen
Server.listen(8080, function () {
  App.swagger.api.host = this.address().address + ':' + this.address().port;
  console.log('App running on %s:%d', this.address().address, this.address().port);
});
io.listen(Server);

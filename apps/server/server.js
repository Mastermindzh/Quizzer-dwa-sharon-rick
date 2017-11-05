'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var fs = require('fs');
var mongoose = require('./modules/mongoose.js');

var io = require('socket.io')(Http);
var App = Express();
var Server = Http.Server(App);

/* services */
var teams = require('./services/teams.js')
var quizzes = require('./services/quizzes.js')
var questions = require('./services/questions.js')
var categories = require('./services/categories.js');

/**Multer setup */
const uploadPath = './images';
var multer = require('multer');
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
var upload = multer({
  storage: storage
});
// static endpoint for images
App.use(Express.static('./images'));

// other middleware
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
  extended: true
}));

// we need CORS because we're working from other domains (e.g react runs from your pc)
io.origins('*:*');
App.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
  next();
});

App.use(Swaggerize({
  api: Path.resolve('./config/swagger.yml'),
  handlers: Path.resolve('./handlers')
}));

io.on('connection', function (client) {
  console.log('a client connected');
  client.on("disconnect", () => console.log("a client disconnected"));
});

// Custom endpoints

const QUIZIDFORTESTMESSAGES = "59fef91fe44d0a36bc000cc9"

App.post('/image', upload.single('teamImage'), function (req, res, next) {
  res.send(req.file.filename);
})

/**
 * Route to apply for a quiz
 */
App.get('/quizzes/:quizId/:teamName/apply', (req, res) => {
  teams.apply(req.params.teamName, req.params.quizId, io).then(response => {
    res.send('team application sent')
  })
})


App.get('/newAnswer', (req, res) => {
  io.emit('new-answer', {
    quizId: QUIZIDFORTESTMESSAGES
  })
  res.send('new testanswer fired')
});

App.get('/questionEnd', (req, res) => {
  io.emit('question-end', {
    quizId: QUIZIDFORTESTMESSAGES
  })
  res.send('new question-end fired')
});

App.get('/questionStart', (req, res) => {
  io.emit('question-start', {
    quizId: QUIZIDFORTESTMESSAGES
  })
  res.send('new questionStart fired')
});

App.get('/newQuestionTest', (req, res) => {
  questions.getAllQuestions().then(questions => {
    io.emit('new-question', {
      question: questions[Math.floor(Math.random() * questions.length)],
      quizId: QUIZIDFORTESTMESSAGES
    })
    res.send('websocket message fired!')
  }).catch(err => {
    res.send(err);
  })
});

App.get('/previouslyPlayedCategories/:quizId', (req, res) => {
  quizzes.getQuiz(req.params.quizId).then(quiz => {
    categories = quiz.rounds.map(round => {
      return round.categories;
    })
    var playedCategories = [];
    quiz.rounds.forEach(round => {
      round.categories.forEach(category => {
        playedCategories.push(category)
      })
    })


    res.send(playedCategories);
  }).catch(err => {
    res.send(err);
  })
})

App.get('/endQuiz', (req, res) => {

  io.emit('quiz-end', {
    quizId: QUIZIDFORTESTMESSAGES
  })
  res.send('end-quiz websocket message fired!')

});

App.post('/startQuiz', (req, res) => {
  quizzes.updateQuizStatus(req.body.quizId, req.body.teams, "Playing").then(quiz => {
    res.send(quiz._id)
  }).catch(err => {
    console.log(err);
    res.status(401).send("not authorized");
  })

})


App.post('/quizzes/:id/:round/addQuestion', (req, res)=>{

  quizzes.addQuestion(req.params.id, req.params.round, req.body.question).then(result =>{
    res.send(200, result)
  }).catch(err=>{
    res.send(400, err)
  })
})

App.post('/quizzes/:id/:round/updateQuestion', (req, res)=>{
  quizzes.updateQuestion(req.params.id, req.params.round, req.body.question).then(result =>{
    res.send(200, result)
  }).catch(err=>{
    res.send(400, err)
  })
})

App.post('/getAvailableQuestions/', (req, res)=>{

  console.log(req.body)

  questions.getAllQuestions().then(questions => {

    questions.forEach(question => {
      req.body.questions.forEach(myQuestion =>{
        if(myQuestion == question._id){
          console.log("matched")
        }
      })

      // if(req.body.categories.includes(question.category.toString())){

      // }
    })

  })
  // quizzes.updateQuestion(req.params.id, req.params.round, req.body.question).then(result =>{
  //   res.send(200, result)
  // }).catch(err=>{
  //   res.send(400, err)
  // })
})



/** example websocket message on team approval */
App.get('/approve/:quizId', (req,res) => {
  io.emit('quiz-start', {
    quizId: req.param.quizId
  })
})


/**
 * Login to the current quiz (will give you the answer back)
 */
App.post('/login', (req, res) => {
  quizzes.getQuizByCode(req.body.code).then(quiz => {
    if (
      (quiz.code != req.body.code) ||
      (quiz.status == "Closed")
    ) {
      console.log("something went wrong")
      return Promise.reject();
    } else {
      if (quiz.status.toLowerCase() === "open") {
        teams.apply(req.body.name, quiz._id, io).then(response => {
          res.send('team application sent')
        })
      } else {
        teams.getTeamByName(req.body.name).then(team => {
          if (quizzes.teamInQuiz(team, quiz) && teams.verifyPassword(team.password, req.body.password)) {
            var currentQuestion = {}
            quiz.rounds.some(round => {
              let answer = round.questions.filter(question => (question.status === "Open"))
              if (answer.length !== 0) { // if answer isn't empty
                currentQuestion = answer[0]; // return element
                return true; // some will exit if we return true :)
              } else {
                return false;
              }
            });
            questions.getQuestion(currentQuestion.questionId).then(question => {
              res.send({
                quizId: quiz._id,
                question: question
              });
            }).catch(err => {
              console.log(err)
              res.status(401).send("not authorized")
            })
          } else {
            return Promise.reject();
          }
        }).catch(err => {
          console.log(err)
          res.status(401).send("not authorized");
        })
      }
    }
  }).catch(err => {
    console.log(err)
    res.status(401).send("not authorized");
  })
})

App.post('/login/scoreboard', (req, res) => {
  console.log(`code: ${req.body.code}`)
  quizzes.getQuizByCode(req.body.code).then(quiz => {
    res.send(quiz._id);
  }).catch(err => {
    res.status(401).send("not authorized");
  })
})

// start server(s) and listen
Server.listen(8080, function () {
  App.swagger.api.host = this.address().address + ':' + this.address().port;
  console.log('App running on %s:%d', this.address().address, this.address().port);
});
io.listen(Server);

module.exports = App; // for testing

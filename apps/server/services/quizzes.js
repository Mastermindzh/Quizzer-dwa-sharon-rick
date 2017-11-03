'use strict'
var mongoose = require('./../modules/mongoose.js');
var questions = require('./questions.js')

/**
 * Get all Quizzes from the database
 *
 */
exports.getAllQuizzes = function () {
  return mongoose.Quiz.find({}).exec();
};

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
function getQuiz(id) {
  return mongoose.Quiz.findOne({
    _id: id
  }).exec();
};
exports.getQuiz = getQuiz;

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
exports.getQuizByCode = function (code) {
  return mongoose.Quiz.findOne({
    code: code
  }).exec();
};

/**
 * Update the quiz according to the id and data provided.
 * @param req, request object that contains the id and data of the quiz that has to be updated.
 */
exports.updateQuiz = function (req, res, callback) {
  //use promises please :)
};

/**
 * Create a new quiz with the data provided in req param.
 * @param req, request object that contains the data of the quiz that has to be created.
 */
exports.createQuiz = function(req){
  let quiz = new mongoose.Quiz({
    name: req.body.name,
    code: req.body.code,
    status: req.body.status
  });

  return quiz.save();
};

/**
 * checks wether team is in quiz
 * @param team
 * @param quiz
 */
exports.teamInQuiz = (team, quiz) => {
  return quiz.teams.indexOf(team.id) > -1
}

/**
 * Gets current question
 * @param id (quiz id)
 */
exports.getCurrentQuestion = function (id) {
  return new Promise(function (fullfill, reject) {
    getQuiz(id).then(quiz => {
      getCurrentDbQuestion(quiz).then(response => {
        questions.getQuestion(response.questionId)
        .then(question => {
          fullfill(question);
        }).catch(err => {
          reject("no current question")
        })
      })
    }).catch(err => {
      reject("no current question")
    })
  })
}

function getCurrentDbQuestion(quiz) {
  return new Promise(function (fullfill, reject) {
    let currQuestion = {};
    quiz.rounds.some(round => {
      let answer = round.questions.filter(question => (question.status === "Open"))
      if (answer.length !== 0) { // if answer isn't empty
        currQuestion = answer[0]; // return element
        return true; // some will exit if we return true :)
      } else {
        return false;
      }
    });
    fullfill(currQuestion);
  })
}

exports.getCurrentDbQuestion = getCurrentDbQuestion

/**
 * returns the id of the current round
 * @param quiz
 */
exports.getCurrentRound = (quiz) => {

  var currentRound = 0;
  // var currentQuestion = {}
  quiz.rounds.some(round => {
    let answer = round.questions.filter(question => (question.status === "Open"))
    if (answer.length !== 0) { // if answer isn't empty
      currentRound = round;
      return true; // some will exit if we return true :)
    } else {
      return false;
    }
  });

  return currentRound
}

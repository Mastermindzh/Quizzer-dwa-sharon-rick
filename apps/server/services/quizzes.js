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
}
exports.getQuiz = getQuiz

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
exports.createQuiz = function (req, res, callback) {
  //use promises please :)
};

/**
 * checks wether team is in quiz
 * @param team
 * @param quiz
 */
exports.teamInQuiz = (team, quiz) => {
  return quiz.teams.indexOf(team.id) > -1
}

exports.getCurrentQuestion = function (id) {
  return new Promise(function (fullfill, reject) {
    getQuiz(id).then(quiz => {
      console.log("found quiz");
      var currentQuestion = {};
      quiz.rounds.some(round => {
        let answer = round.questions.filter(question => (question.status === "Open"))
        if (answer.length !== 0) { // if answer isn't empty
          currentQuestion = answer[0]; // return element
          return true; // some will exit if we return true :)
        } else {
          return false;
        }
      });
      questions.getQuestion(currentQuestion.questionId)
        .then(question => {
          fullfill(question);
        }).catch(err => {
          reject("no current question")
        })
    }).catch(err => {
      reject("no current question")
    })
  })
}

'use strict'
var mongoose = require('./../modules/mongoose.js');
var quizzes = require('./quizzes.js')
var teams = require('./teams.js')
var questions = require('./questions.js')
/**
 * Get all answers in the quiz by question id
 * @param quizId
 * @param questionId
 */
exports.getAnswerInQuizByQuestionId = function (quizId, questionId) {
  return new Promise(function (fulfill, reject) {
    quizzes.getQuiz(quizId).then(quiz => {
      let question = {};
      quiz.rounds.some(round => {
        let answer = round.questions.filter(question => (question.id === questionId))
        if (answer.length !== 0) { // if answer isn't empty
          question = answer[0]; // return element
          return true; // some will exit if we return true :)
        } else {
          return false;
        }
      });
      // we found the question resolve promise with answers
      fulfill(question.answers)
    }).catch(err => {
      reject()
    })
  })
};

exports.addAnswer = (id, teamName, body) => {
  return new Promise(function (fulfill, reject) {
    if(!body.answer.trim()){
      reject('answer is empty')
    }
    teams.getTeamByName(teamName).then(team => {
      var answer = {
        answer: body.answer,
        teamId: team._id
      }
      quizzes.getQuiz(id).then(quiz => {
        let quizRound = quizzes.getCurrentRound(quiz);
        let currentQuestion = quizzes.getCurrentDbQuestion(quiz)

        Promise.all([quizRound, currentQuestion]).then(response => {
          let answers = quiz.rounds.id(response[0]._id).questions.id(response[1]._id).answers;

          questions.getQuestion(response[1].questionId).then(question => {
            // filter out unique answers not belonging to this team
            let newAnswers = []
            answers.forEach((answerItem) => {
              if (answerItem.teamId != team._id.toString()) {
                newAnswers.push(answerItem)
              }
            })
            answer.approved = answer.answer === question.answer
            newAnswers.push(answer)

            quiz.rounds.id(response[0]._id).questions.id(response[1]._id).answers = newAnswers

            quiz.save(function (err, result) {
              if (err) console.log(err)
              fulfill(answer)
            })
          }).catch(err => {
            reject("no such question")
          })
        }).catch(err => {
          reject("round or question missing")
        })
      }).catch(err => {
        reject("can't find quiz")
      })
    }).catch(err => {
      reject("no such team")
    })
  });
}

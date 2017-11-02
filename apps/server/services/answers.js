'use strict'
var mongoose = require('./../modules/mongoose.js');
var quizzes = require('./quizzes.js')

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

exports.addAnswer = (id, questionId, teamName, body) => {

  return new Promise(function (fulfill, reject) {
    //todo, get teamId from the database.
    //todo put that in the answer object below, instead of hardcoded teamId
    //todo round id(2) is now static, determine what round it should be and replace static with dynamic value
    //todo same for questionId, replace that with dynamic value
    //todo win:)
    //todo check whether answer already exists, if so update that instead
    var answer = {answer: body.answer, teamId: "59fb8e0ea242b34d22a40e04"}
    quizzes.getQuiz(id).then(quiz => {
      quiz.rounds.id(2).questions.id("59fb8e0fa242b34d22a41136").answers.push(answer)
      console.log(`quiz: ${JSON.stringify(quiz)}`);
      quiz.save(function(err, result){
        if(err) console.log(err)
        console.log(result);
      })
      console.log('supposedly I saved');
    }).catch(err => {
      console.log(err);
      console.log('no quiz')
      reject("can't find quiz")
    })
  });

}

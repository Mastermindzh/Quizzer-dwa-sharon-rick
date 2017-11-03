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

    console.log(`id: ${id}`)
    console.log(`questionId: ${questionId}`)
    console.log(`teamName: ${teamName}`)
    console.log(`body: ${body}`)

    quizzes.getQuiz(id).then(quiz => {

      //       User.update({username: oldUsername}, {
      //     username: newUser.username,
      //     password: newUser.password,
      //     rights: newUser.rights
      // }, function(err, numberAffected, rawResponse) {
      //    //handle it
      // })

      // console.log('quiz update thing')
      // console.log(quiz.markModified)
      // let question = {}
      // quiz.rounds.some(round => {
      //   let answer = round.questions.filter(question => (question.id === questionId))
      //   if (answer.length !== 0) { // if answer isn't empty
      //     question = answer[0]; // return element
      //     return true; // some will exit if we return true :)
      //   } else {
      //     return false;
      //   }
      // });

      // question.answers.push(
      //   {
      //     answer: "inserted using code",
      //     approved: "false",
      //     teamId: "id"
      //   }
      // )

      // console.log(question.answers)

      // quiz.rounds[0].questions[0] = question;
      // console.log(quiz.rounds[0].questions[0]);

      // quiz.markModified('rounds')

      // quiz.save().then((a,b,c) =>{
      //   console.log(`a: ${a}`)
      //   console.log(`b: ${b}`)
      //   console.log(`c: ${c}`)
      // });

      console.log('supposedly I saved');
    }).catch(err => {
      console.log('no quiz')
      reject("can't find quiz")
    })
  });

}

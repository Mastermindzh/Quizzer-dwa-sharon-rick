'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/startQuiz
 */
module.exports = {
  /**
   * summary: Starts the quiz
   * description: Starts the quiz with approved teams
   * parameters: body
   * produces: application/json
   * responses: 200
   * operationId: startQuiz
   */
  post: {
    200: function (req, res, callback) {
      quizzes.updateQuizStatus(req.params.id, req.body.teams, "Playing").then(quiz => {
        res.send(quiz._id)
      }).catch(err => {
        console.log(err);
        res.status(401).send("not authorized");
      })
    }
  }
};

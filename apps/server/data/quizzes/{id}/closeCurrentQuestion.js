'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}/closeCurrentQuestion
 */
module.exports = {
  /**
   * summary: close the current question
   * description: close the current question
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: closeCurrentQuiz
   */
  get: {
    200: function (req, res, callback) {
      quizzes.closeCurrentQuestion(req.params.id).then(answers => {
        res.send(answers)
      }).catch(err => {
        res.status(500).send("can't close question")
      })
    }
  }
};

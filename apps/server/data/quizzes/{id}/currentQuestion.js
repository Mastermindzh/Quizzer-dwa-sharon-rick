'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}/currentQuestion
 */
module.exports = {
  /**
   * summary: Get current quiz question
   * description: Get current quiz question
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: getCurrentQuestionByQuizId
   */
  get: {
    200: function (req, res, callback) {
      quizzes.getCurrentQuestion(req.params.id).then(
        question => {
          res.send(question)
        }
      ).catch(err => {
        res.status(500).send("no current question")
      });
    }
  }
};

'use strict';
var Mockgen = require('../../mockgen.js');
var answers = require('../../../services/answers.js')
/**
 * Operations on /quizzes/{id}/answers
 */
module.exports = {
  /**
   * summary: Get all answers in the current quiz for the current question
   * description: Get all answers in the current quiz for the current quiz
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: getCurrentAnswers
   */
  get: {
    200: function (req, res, callback) {
      answers.getCurrentAnswers(req.params.id).then(answers =>{
        res.send(answers)
      }).catch(err => {
        res.status(500).send('no answers')
      })
    }
  }
};

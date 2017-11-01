'use strict';
var Mockgen = require('./mockgen.js');
var questions = require('./../services/questions.js')
/**
 * Operations on /questions/
 */
module.exports = {
  /**
   * summary: Get all questions
   * description: Get all questions
   * parameters:
   * produces: application/json
   * responses: 200
   * operationId: getQuestions
   */
  get: {
    200: function (req, res, callback) {
      questions.getAllQuestions()
        .then(questions => {
          res.send(questions);
        }).catch(err => {
          res.status(404).send("no questions found");
        })
    }
  }
};

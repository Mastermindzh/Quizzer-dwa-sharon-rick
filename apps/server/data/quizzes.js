'use strict';
var Mockgen = require('./mockgen.js');
var quizzes = require('./../services/quizzes.js')
/**
 * Operations on /quizzes/
 */
module.exports = {
  /**
   * summary: Get all quizzes
   * description: Get all quizzes
   * parameters:
   * produces: application/json
   * responses: 200
   * operationId: getQuizzes
   */
  get: {
    200: function (req, res, callback) {
      quizzes.getAllQuizzes()
        .then(quizzes => {
          res.send(quizzes);
        }).catch(err => {
          res.status(404).send("no quizzes found");
        })
    }
  },
  /**
   * summary: Update or add a new quiz
   * description: Update or add a new quiz
   * parameters: body
   * produces: application/json
   * responses: 200
   * operationId: addQuiz
   */
  post: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/quizzes/',
        operation: 'post',
        response: '200'
      }, callback);
    }
  }
};

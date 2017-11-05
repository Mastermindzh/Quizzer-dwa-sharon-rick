'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /quizzes/addQuestion
 */
module.exports = {
  /**
   * summary: Adds a new question
   * description: Adds a new question to the round
   * parameters: body
   * produces: application/json
   * responses: 200
   * operationId: addQuestion
   */
  post: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/quizzes/addQuestion',
        operation: 'post',
        response: '200'
      }, callback);
    }
  }
};

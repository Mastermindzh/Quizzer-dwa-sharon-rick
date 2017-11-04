'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}/score
 */
module.exports = {
  /**
   * summary: Get current score
   * description: Get current score given a quiz id
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: getCurrentScoreByQuizId
   */
  get: {
    200: function (req, res, callback) {
      quizzes.getScore(req.params.id).then(
        scores => {
          res.send(scores)
        }
      ).catch(err => {
        console.log(err)
        res.status(500).send("no score")
      });
    }
  }
};

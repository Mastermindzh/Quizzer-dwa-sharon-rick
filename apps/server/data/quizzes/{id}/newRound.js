'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/newRound
 */
module.exports = {
  /**
   * summary: Starts a new round
   * description: Starts a new round with selected categories
   * parameters: body
   * produces: application/json
   * responses: 200
   * operationId: startRound
   */
  post: {
    200: function (req, res, callback) {
      quizzes.newRound(req.params.id, req.body).then(quiz => {
        console.log("quiz with new round: "+JSON.stringify(quiz))
        res.send(quiz._id)
      }).catch(err => {
        console.log(err);
        res.status(401).send("not authorized.")
      })
    }
  }
};

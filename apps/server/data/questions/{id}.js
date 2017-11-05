'use strict';
var Mockgen = require('../mockgen.js');
var questions = require('./../../services/questions.js')
/**
 * Operations on /questions/{id}
 */
module.exports = {
  /**
   * summary: Get a specific question by id
   * description: Get a specific question by id
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: getQuestionById
   */
  get: {
    200: function (req, res, callback) {
      questions.getQuestion(req.params.id).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(404).send("no such question");
      })
    }
  }
};

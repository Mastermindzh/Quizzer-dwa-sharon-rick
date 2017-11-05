'use strict';
var Mockgen = require('../../../mockgen.js');
var answers = require('./../../../../services/answers.js')
/**
 * Operations on /quizzes/{id}/answers/{teamName}/
 */
module.exports = {
  /**
   * summary: Add / update an answer
   * description: Update or add a new answer
   * parameters: id, teamName, body
   * produces: application/json
   * responses: 200
   * operationId: addAnswer
   */
  put: {
    200: function (req, res, callback) {
      console.log('hello')
      answers.addAnswer(req.params.id, req.params.teamName, req.body).then(
        answers => {
          res.send(answers)
        }
      ).catch(err => {
        console.log(err);
        res.status(401).send("object not updated");
      });
    }
  }
};

'use strict';
var Mockgen = require('../../../mockgen.js');
var answers = require('./../../../../services/answers.js')
/**
 * Operations on /quizzes/{id}/{questionId}/answers
 */
module.exports = {
    /**
     * summary: Get all answers in the current quiz for the current quiz
     * description: Get all answers in the current quiz for the current quiz
     * parameters: id, questionId
     * produces: application/json
     * responses: 200
     * operationId: getAnswerInQuizByQuestionId
     */
    get: {
        200: function (req, res, callback) {
          answers.getAnswerInQuizByQuestionId(req.params.id, req.params.questionId).then(
            answers => {
              res.send(answers)
            }
          ).catch(err => {
            res.status(404).send("no answers found");
          });
        }
    }
};

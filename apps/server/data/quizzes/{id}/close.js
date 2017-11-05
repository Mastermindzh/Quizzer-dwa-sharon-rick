'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}/close
 */
module.exports = {
    /**
     * summary: close quiz
     * description: close quiz
     * parameters: id
     * produces: application/json
     * responses: 200
     * operationId: closeQuiz
     */
    get: {
        200: function (req, res, callback) {
          quizzes.closeQuiz(req.params.id).then(response => {
            res.send('closed')
          }).catch(err => {
            res.status(500).send(err);
          })
        }
    }
};

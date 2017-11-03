'use strict';
var Mockgen = require('../mockgen.js');
var quizzes = require('./../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}
 */
module.exports = {
    /**
     * summary: Get a specific quiz by id
     * description: Get a specific quiz by id
     * parameters: id
     * produces: application/json
     * responses: 200
     * operationId: getQuizById
     */
    get: {
        200: function (req, res, callback) {
          quizzes.getQuiz(req.params.id).then(data => {
            res.send(data);
          }).catch(err => {
            res.status(404).send("no such quizz");
          })
        }
    }
};

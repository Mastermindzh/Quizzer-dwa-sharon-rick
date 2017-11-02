'use strict';
var dataProvider = require('../../../../data/quizzes/{id}/{questionId}/answers.js');
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
     */
    get: function getAnswerInQuizByQuestionId(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};

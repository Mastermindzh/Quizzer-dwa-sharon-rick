'use strict';
var dataProvider = require('../../../data/quizzes/{id}/answers.js');
/**
 * Operations on /quizzes/{id}/answers
 */
module.exports = {
    /**
     * summary: Get all answers in the current quiz for the current question
     * description: Get all answers in the current quiz for the current quiz
     * parameters: id
     * produces: application/json
     * responses: 200
     */
    get: function getCurrentAnswers(req, res, next) {
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

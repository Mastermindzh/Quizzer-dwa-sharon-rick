'use strict';
var dataProvider = require('../../../data/quizzes/{id}/closeCurrentQuestion.js');
/**
 * Operations on /quizzes/{id}/closeCurrentQuestion
 */
module.exports = {
    /**
     * summary: close the current question
     * description: close the current question
     * parameters: id
     * produces: application/json
     * responses: 200
     */
    get: function closeCurrentQuiz(req, res, next) {
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

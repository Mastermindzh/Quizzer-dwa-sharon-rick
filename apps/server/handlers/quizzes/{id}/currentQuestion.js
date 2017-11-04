'use strict';
var dataProvider = require('../../../data/quizzes/{id}/currentQuestion.js');
/**
 * Operations on /quizzes/{id}/currentQuestion
 */
module.exports = {
    /**
     * summary: Get current quiz question
     * description: Get current quiz question
     * parameters: id
     * produces: application/json
     * responses: 200
     */
    get: function getCurrentQuestionByQuizId(req, res, next) {
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

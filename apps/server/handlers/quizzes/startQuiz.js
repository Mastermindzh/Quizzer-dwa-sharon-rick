'use strict';
var dataProvider = require('../../data/quizzes/startQuiz.js');
/**
 * Operations on /quizzes/startQuiz
 */
module.exports = {
    /**
     * summary: Starts the quiz
     * description: Starts the quiz with approved teams
     * parameters: body
     * produces: application/json
     * responses: 200
     */
    post: function startQuiz(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};

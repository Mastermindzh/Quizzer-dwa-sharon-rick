'use strict';
var dataProvider = require('../data/quizzes.js');
/**
 * Operations on /quizzes/
 */
module.exports = {
    /**
     * summary: Get all quizzes
     * description: Get all quizzes
     * parameters: 
     * produces: application/json
     * responses: 200
     */
    get: function getQuizzes(req, res, next) {
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
    },
    /**
     * summary: Update or add a new quiz
     * description: Update or add a new quiz
     * parameters: body
     * produces: application/json
     * responses: 200
     */
    post: function addQuiz(req, res, next) {
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

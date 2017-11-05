'use strict';
var dataProvider = require('../../data/quizzes/addQuestion.js');
/**
 * Operations on /quizzes/addQuestion
 */
module.exports = {
    /**
     * summary: Adds a new question
     * description: Adds a new question to the round
     * parameters: body
     * produces: application/json
     * responses: 200
     */
    post: function addQuestion(req, res, next) {
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

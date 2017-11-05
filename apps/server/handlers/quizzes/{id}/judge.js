'use strict';
var dataProvider = require('../../../data/quizzes/{id}/judge.js');
/**
 * Operations on /quizzes/{id}/judge/
 */
module.exports = {
    /**
     * summary: judge the current question
     * description: judge the current question
     * parameters: id, body
     * produces: application/json
     * responses: 200
     */
    put: function judgeQuestion(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};

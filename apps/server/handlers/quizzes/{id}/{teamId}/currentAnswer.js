'use strict';
var dataProvider = require('../../../../data/quizzes/{id}/{teamId}/currentAnswer.js');
/**
 * Operations on /quizzes/{id}/{teamId}/currentAnswer
 */
module.exports = {
    /**
     * summary: Get the current answer in a quiz for a team
     * description: Get the current answer in a quiz for a team
     * parameters: id, teamId
     * produces: application/json
     * responses: 200
     */
    get: function getCurrentAnswerByTeamId(req, res, next) {
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

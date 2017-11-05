'use strict';
var dataProvider = require('../../../../data/quizzes/{id}/answers/{teamName}.js');
/**
 * Operations on /quizzes/{id}/answers/{teamName}/
 */
module.exports = {
    /**
     * summary: Add / update an answer
     * description: Update or add a new answer
     * parameters: id, teamName, body
     * produces: application/json
     * responses: 200
     */
    put: function addAnswer(req, res, next) {
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

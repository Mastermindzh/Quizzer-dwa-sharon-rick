'use strict';
var dataProvider = require('../../../data/quizzes/{id}/newRound.js');
/**
 * Operations on /quizzes/{id}/newRound
 */
module.exports = {
    /**
     * summary: Starts a new round
     * description: Starts a new round with selected categories
     * parameters: id, body
     * produces: application/json
     * responses: 200
     */
    post: function startRound(req, res, next) {
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

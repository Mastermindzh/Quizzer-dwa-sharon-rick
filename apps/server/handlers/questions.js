'use strict';
var dataProvider = require('../data/questions.js');
/**
 * Operations on /questions/
 */
module.exports = {
    /**
     * summary: Get all questions
     * description: Get all questions
     * parameters: 
     * produces: application/json
     * responses: 200
     */
    get: function getQuestions(req, res, next) {
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

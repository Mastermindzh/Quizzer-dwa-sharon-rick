'use strict';
var dataProvider = require('../../data/questions/{id}.js');
/**
 * Operations on /questions/{id}
 */
module.exports = {
    /**
     * summary: Get a specific question by id
     * description: Get a specific question by id
     * parameters: id
     * produces: application/json
     * responses: 200
     */
    get: function getQuestionById(req, res, next) {
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

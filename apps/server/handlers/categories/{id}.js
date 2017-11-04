'use strict';
var dataProvider = require('../../data/categories/{id}.js');
/**
 * Operations on /categories/{id}
 */
module.exports = {
    /**
     * summary: Get a specific category by id
     * description: Get a specific category by id
     * parameters: id
     * produces: application/json
     * responses: 200
     */
    get: function getCategoryById(req, res, next) {
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

'use strict';
var dataProvider = require('../data/categories.js');
/**
 * Operations on /categories/
 */
module.exports = {
    /**
     * summary: Get all categories
     * description: Get all categories
     * parameters: 
     * produces: application/json
     * responses: 200
     */
    get: function getCategories(req, res, next) {
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

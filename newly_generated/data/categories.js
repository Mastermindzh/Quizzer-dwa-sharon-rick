'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: getCategories
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/categories/',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};

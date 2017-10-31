'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /teams/{id}
 */
module.exports = {
    /**
     * summary: Get a specific team by id
     * description: Get a specific team by id
     * parameters: id
     * produces: application/json
     * responses: 200
     * operationId: getTeamById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/teams/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};

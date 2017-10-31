'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /teams/
 */
module.exports = {
    /**
     * summary: Get all teams
     * description: Get all teams
     * parameters: 
     * produces: application/json
     * responses: 200
     * operationId: getTeams
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/teams/',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Add a new team
     * description: Add a new team
     * parameters: body
     * produces: application/json
     * responses: 200
     * operationId: addTeam
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/teams/',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};

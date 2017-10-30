'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: getQuestionById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/questions/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};

'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /quizzes/{id}
 */
module.exports = {
    /**
     * summary: Get a specific quiz by id
     * description: Get a specific quiz by id
     * parameters: id
     * produces: application/json
     * responses: 200
     * operationId: getQuizById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/quizzes/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};

'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: getQuestions
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/questions/',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};

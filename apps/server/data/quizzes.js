'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /quizzes/
 */
module.exports = {
    /**
     * summary: Get all quizzes
     * description: Get all quizzes
     * parameters: 
     * produces: application/json
     * responses: 200
     * operationId: getQuizzes
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/quizzes/',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Update or add a new quiz
     * description: Update or add a new quiz
     * parameters: body
     * produces: application/json
     * responses: 200
     * operationId: addQuiz
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/quizzes/',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};

'use strict';
var Mockgen = require('../../mockgen.js');
var quizzes = require('../../../services/quizzes.js')
/**
 * Operations on /quizzes/{id}/judge/
 */
module.exports = {
    /**
     * summary: judge the current question
     * description: judge the current question
     * parameters: id, body
     * produces: application/json
     * responses: 200
     * operationId: judgeQuestion
     */
    put: {
        200: function (req, res, callback) {
          quizzes.judge(req.params.id, req.body.teamId, req.body.judgement).then(response =>{
            res.send(response)
          }).catch(err => {
            console.log(err)
            res.send(err);
          })
        }
    }
};

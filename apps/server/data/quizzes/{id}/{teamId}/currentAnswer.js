'use strict';
var Mockgen = require('../../../mockgen.js');
var teams = require('./../../../../services/teams.js')
/**
 * Operations on /quizzes/{id}/{teamId}/currentAnswer
 */
module.exports = {
  /**
   * summary: Get the current answer in a quiz for a team
   * description: Get the current answer in a quiz for a team
   * parameters: id, teamId
   * produces: application/json
   * responses: 200
   * operationId: getCurrentAnswerByTeamId
   */
  get: {
    200: function (req, res, callback) {
      teams.getCurrentAnswer(req.params.id, req.params.teamId).then(
        question => {
          res.send(question)
        }
      ).catch(err => {
        res.status(500).send("no current answer")
      });
      //teams.getCurrentAnswer("59fb8e0fa242b34d22a4112b", '59fb8e0ea242b34d22a40e02')
    }
  }
};

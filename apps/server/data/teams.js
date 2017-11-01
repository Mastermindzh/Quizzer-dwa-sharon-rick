'use strict';
var Mockgen = require('./mockgen.js');
var teams = require('./../services/teams.js')

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
      teams.getAllTeams()
        .then(teams => {
          res.send(teams);
        }).catch(err => {
          res.status(404).send("no teams found");
        })
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
      teams.createNewTeam(req)
      .then(team => {
        res.send(team);
      })
      .catch(err => {
        res.status(500).send("team not created");
      })
    }
  }
};

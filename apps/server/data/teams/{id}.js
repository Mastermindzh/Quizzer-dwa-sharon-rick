'use strict';
var Mockgen = require('../mockgen.js');
var teams = require('./../../services/teams.js')
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
          teams.getTeam(req.params.id, team=> res.send(team));
        }
    }
};

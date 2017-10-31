'use strict';
var dataProvider = require('../data/teams.js');
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
     */
    get: function getTeams(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: Add a new team
     * description: Add a new team
     * parameters: body
     * produces: application/json
     * responses: 200
     */
    post: function addTeam(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};

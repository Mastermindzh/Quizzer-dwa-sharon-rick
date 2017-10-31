'use strict';
var dataProvider = require('../../data/teams/{id}.js');
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
     */
    get: function getTeamById(req, res, next) {
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
    }
};

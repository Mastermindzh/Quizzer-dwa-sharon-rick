'use strict';
var Mockgen = require('./mockgen.js');
var categories = require('./../services/categories.js')
/**
 * Operations on /categories/
 */
module.exports = {
    /**
     * summary: Get all categories
     * description: Get all categories
     * parameters:
     * produces: application/json
     * responses: 200
     * operationId: getCategories
     */
    get: {
        200: function (req, res, callback) {
          categories.getAllCategories()
            .then(categories => {
              res.send(categories);
            }).catch(err => {
            res.status(404).send("no categories found");
          })
        }
    }
};

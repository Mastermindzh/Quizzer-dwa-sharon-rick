'use strict';
var Mockgen = require('../mockgen.js');
var categories = require('./../../services/categories.js')
/**
 * Operations on /categories/{id}
 */
module.exports = {
  /**
   * summary: Get a specific category by id
   * description: Get a specific category by id
   * parameters: id
   * produces: application/json
   * responses: 200
   * operationId: getCategoryById
   */
  get: {
    200: function (req, res, callback) {
      categories.getCategory(req.params.id).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(404).send("no such category");
      })
    }
  }
};

'use strict';

var utils = require('../utils/writer.js');
var Categories = require('../service/CategoriesService');

module.exports.getCategories = function getCategories (req, res, next) {
  Categories.getCategories()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

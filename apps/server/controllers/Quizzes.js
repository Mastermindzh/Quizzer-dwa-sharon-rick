'use strict';

var utils = require('../utils/writer.js');
var Quizzes = require('../service/QuizzesService');

module.exports.getQuizById = function getQuizById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Quizzes.getQuizById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuizzes = function getQuizzes (req, res, next) {
  Quizzes.getQuizzes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

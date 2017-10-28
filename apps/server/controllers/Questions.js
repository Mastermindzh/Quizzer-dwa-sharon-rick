'use strict';

var utils = require('../utils/writer.js');
var Questions = require('../service/QuestionsService');

module.exports.getQuestionById = function getQuestionById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Questions.getQuestionById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuestions = function getQuestions (req, res, next) {
  Questions.getQuestions()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

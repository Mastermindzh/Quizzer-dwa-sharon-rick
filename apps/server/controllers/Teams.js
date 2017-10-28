'use strict';

var utils = require('../utils/writer.js');
var Teams = require('../service/TeamsService');

module.exports.addTeam = function addTeam (req, res, next) {
  var body = req.swagger.params['body'].value;
  Teams.addTeam(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeams = function getTeams (req, res, next) {
  Teams.getTeams()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

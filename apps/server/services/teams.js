'use strict'
var mongoose = require('./../modules/mongoose.js');
var quizzes = require('./quizzes.js')

/**
 * Get all Teams from the database
 *
 */
exports.getAllTeams = function () {
  return mongoose.Team.find({}).exec();
};

/**
 * Get a specific team from the database
 * @param req, request object that contains the id of the requested team
 */
exports.getTeam = function (id) {
  return mongoose.Team.findOne({
    _id: id
  }).exec();
};

/**
 * get a specific team from the database by using its name
 * @param name name of the team you want
 * @param callback method which will receive the team
 */
exports.getTeamByName = function (name) {
  return mongoose.Team.findOne({
    name: name
  }).exec();
}

/**
 * Create a new Team and add it to the database
 * @param req, request object that contains the data of the team that has to be created.
 */
exports.createNewTeam = function (req) {

  let team = new mongoose.Team({
    name: req.body.name,
    password: req.body.password,
    picture: req.body.picture
  })

  return team.save();
};

/**
 * Simple password verification function
 * could expand upon this with crypto's and stuff :)
 * @param realPass password as present in database
 * @param givenPass password provided by client
 */
exports.verifyPassword = (realPass, givenPass) => {
  return realPass == givenPass;
}

exports.getCurrentAnswer = (quizId, teamId) =>{
  quizzes.getCurrentQuestion(quizId).then(response =>{
    console.log(response)
  }).catch(err => {

  })
  console.log('getting current answer');

}

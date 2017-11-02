'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all Quizzes from the database
 *
 */
exports.getAllQuizzes = function(){
  return mongoose.Quiz.find({}).exec();
};

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
exports.getQuiz = function(id){
  return mongoose.Quiz.findOne({
    _id: id
  }).exec();
};

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
exports.getQuizByCode = function(code){
  return mongoose.Quiz.findOne({
    code: code
  }).exec();
};

/**
 * Update the quiz according to the id and data provided.
 * @param req, request object that contains the id and data of the quiz that has to be updated.
 */
exports.updateQuiz = function(req, res, callback){
  //use promises please :)
};

/**
 * Create a new quiz with the data provided in req param.
 * @param req, request object that contains the data of the quiz that has to be created.
 */
exports.createQuiz = function(req, res, callback){
  //use promises please :)
};

/**
 * checks wether team is in quiz
 * @param team
 * @param quiz
 */
exports.teamInQuiz = (team, quiz) =>{
  return quiz.teams.indexOf(team.id) > -1
}

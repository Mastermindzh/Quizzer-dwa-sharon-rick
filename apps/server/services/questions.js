'use strict'
var mongoose = require('./../modules/mongoose.js');
var quizzes = require('./quizzes.js')
/**
 * Get all Questions from the database
 *
 */
exports.getAllQuestions = function () {
  return mongoose.Question.find({}).exec();
};

/**
 * Get a specific question from the database
 * @param req, request object that contains the id of the requested question
 */
function getQuestion(id){
return mongoose.Question.findOne({
    _id: id
  }).exec();
}
exports.getQuestion = getQuestion;



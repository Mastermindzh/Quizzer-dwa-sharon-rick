'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all Quizzes from the database
 *
 */
exports.getAllQuizzes = function(){
  try {
  }catch(err){
    console.log("Error found in service Quizzes: "+err.message);
  }
};

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
exports.getQuiz = function(id, callback){
  try{
    mongoose.Quiz.findOne({_id: id}).exec((err, quiz) => {
      if(err) throw new Error(err);
      return callback(quiz)
    })
  }
  catch(err){
    console.log("Error found in service Quizzes: "+err.message);
  }
};

/**
 * Update the quiz according to the id and data provided.
 * @param req, request object that contains the id and data of the quiz that has to be updated.
 */
exports.updateQuiz = function(req, res, callback){
  try{
  }
  catch(err){
    console.log("Error found in service Quizzes: "+err.message);
  }
};

/**
 * Create a new quiz with the data provided in req param.
 * @param req, request object that contains the data of the quiz that has to be created.
 */
exports.createQuiz = function(req, res, callback){
  try{
  }
  catch(err){
    console.log("Error found in service Quizzes: "+err.message);
  }
};

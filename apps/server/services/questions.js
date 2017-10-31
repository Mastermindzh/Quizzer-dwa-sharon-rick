'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all Questions from the database
 *
 */
exports.getAllQuestions = function(req, res, callback){
  try {

  }catch(err){
    console.log("Error found in service Questions: "+err.message);
  }
};

/**
 * Get a specific question from the database
 * @param req, request object that contains the id of the requested question
 */
exports.getQuestion = function(req, res, callback){
  try{

  }
  catch(err){
    console.log("Error found in service Questions: "+err.message);
    callback(err);
  }
};


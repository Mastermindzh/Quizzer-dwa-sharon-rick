'use strict';


/**
 * Get a specific question by id
 * Get a specific question by id
 *
 * id String id of the question you want
 * returns Question
 **/
exports.getQuestionById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "question" : "question",
  "answer" : "answer",
  "_id" : "_id",
  "category" : {
    "name" : "name",
    "_id" : "_id"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all questions
 * Get all questions
 *
 * returns List
 **/
exports.getQuestions = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "question" : "question",
  "answer" : "answer",
  "_id" : "_id",
  "category" : {
    "name" : "name",
    "_id" : "_id"
  }
}, {
  "question" : "question",
  "answer" : "answer",
  "_id" : "_id",
  "category" : {
    "name" : "name",
    "_id" : "_id"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


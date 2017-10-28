'use strict';


/**
 * Add a new team
 * Add a new team
 *
 * body Team Team object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addTeam = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all teams
 * Get all teams
 *
 * returns List
 **/
exports.getTeams = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "name" : "name",
  "_id" : "_id",
  "picture" : "picture"
}, {
  "password" : "password",
  "name" : "name",
  "_id" : "_id",
  "picture" : "picture"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


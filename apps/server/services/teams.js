'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all Teams from the database
 *
 */
exports.getAllTeams = function(req, res, callback){
  try {
    mongoose.Team.find({}).exec((err, teams) => {
      if(err) throw new Error(err);
      console.log(teams);
      return callback(err, {responses: teams});
    });
  }catch(err){
    console.log("Error found in service Teams: "+err.message);
    return callback(err);
  }
};

/**
 * Get a specific team from the database
 * @param req, request object that contains the id of the requested team
 */
exports.getTeam = function(req, res, callback){
  try{
    mongoose.Team.findOne({_id: req.body._id}).exec((err, team) => {
      if(err) throw new Error(err);
      return callback(err, {responses: team})
    })
  }
  catch(err){
    console.log("Error found in service Teams: "+err.message);
    callback(err);
  }
};

/**
 * Create a new Team and add it to the database
 * @param req, request object that contains the data of the team that has to be created.
 */
exports.createNewTeam = function(req, res, callback){
  try{
    console.log(JSON.stringify(req.body));
    let team = {
      name: req.body.name,
      password: req.body.password,
      picture: req.body.picture
    };
    mongoose.Team.create(team).exec((err, team) => {
      callback(err, {responses: team});
    })
  }
  catch(err){
    console.log("Error found in service Teams: "+err.message);
    callback(err);
  }
};


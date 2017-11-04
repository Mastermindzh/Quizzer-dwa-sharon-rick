'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all the categories from the database
 **/
exports.getAllCategories = function (req, res, callback) {
  return mongoose.Category.find({}).exec();
};


exports.getPreviouslyPlayedCategories = function (quizId) {

}

/**
 * Get a specific Category from the database
 * @param req, request object that contains the id of the requested Category
 */
exports.getCategory = function (id) {
  return mongoose.Category.findOne({
    _id: id
  }).exec();
};


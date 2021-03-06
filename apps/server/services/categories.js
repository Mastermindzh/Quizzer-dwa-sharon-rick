'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all the categories from the database
 **/
exports.getAllCategories = function (req, res, callback) {
  return mongoose.Category.find({}).exec();
};

/**
 * Get a specific Category from the database
 * @param req, request object that contains the id of the requested Category
 */
exports.getCategory = function (id) {
  console.log("reached the function getcategory")
  return mongoose.Category.findOne({
    _id: id
  }).exec();
};


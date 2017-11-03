'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all the categories from the database
 **/
exports.getAllCategories = function (req, res, callback) {
  return mongoose.Category.find({}).exec();
};

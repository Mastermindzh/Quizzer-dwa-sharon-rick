'use strict'
var mongoose = require('./../modules/mongoose.js');

/**
 * Get all the categories from the database
 **/
exports.getAllCategories = function(req, res, callback){
  try {
    mongoose.Category.find({}).exec((err, categories) => {
      if(err) throw new Error(err);
      console.log(categories);
      return callback(err, {responses: categories});
    });
  }catch(err){
    console.log("Error found in service Categories: "+err.message);
    return callback(err);
  }
};

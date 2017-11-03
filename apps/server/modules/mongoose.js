'use strict';
var mongoose = require('mongoose');
var config = require('./../config.js')

require('../mongoose/category.js');
require('../mongoose/quiz.js');
require('../mongoose/team.js');
require('../mongoose/question.js');

var Category = mongoose.model('Category');
var Team = mongoose.model('Team');
var Question = mongoose.model('Question');
var Quiz = mongoose.model('Quiz');

mongoose.connect(config.dbhost + config.db);

exports.mongoose = mongoose;
exports.Category = Category;
exports.Team = Team;
exports.Question = Question;
exports.Quiz = Quiz;

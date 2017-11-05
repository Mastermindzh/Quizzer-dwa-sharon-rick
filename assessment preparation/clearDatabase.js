'use strict'
var mongoose = require('mongoose');
require('../definitions/mongoose schemas/category.js');
require('../definitions/mongoose schemas/quiz.js');
require('../definitions/mongoose schemas/team.js');
require('../definitions/mongoose schemas/question.js');

var Category = mongoose.model('Category');
var Team = mongoose.model('Team');
var Question = mongoose.model('Question');
var Quiz = mongoose.model('Quiz');

var dbName = 'Quizzer';
let port = '8009';

/**
 * Connects to the database
 */
function connect() {
    mongoose.connect('mongodb://localhost:' + port + '/' + dbName, function() {
        mongoose.connection.db.dropDatabase();
    });
}

'use strict'
var mongoose = require('mongoose');
require('../definitions/mongoose schemas/category.js');
require('../definitions/mongoose schemas/quiz.js');
require('../definitions/mongoose schemas/team.js');
require('../definitions/mongoose schemas/question.js');

var seedData = require('./data');

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

/**
 * Function which checks whether there is an error, if there is it will close the connection
 * @param {Error} err mongoose error response
 */
function done(err) {
    if (err) console.log("Error found! " + err);
    mongoose.connection.close();
}

/**
 * Refresh all data in the database
 */
function refreshDatabase() {
    Team.create(seedData.teams, function(err) {
        if (err) return done(err);
        console.log();
        console.log("===TEAM CREATED===");

        Category.create(seedData.categories, function(err) {
            if (err) return done(err);
            console.log("===CATEGORY CREATED===");

            var questionPromises = seedData.questions.map(function(question) {
                return createQuestion(question);
            });

            Promise.all(questionPromises).then(function() {
                console.log("===QUESTION CREATED===");

                var quizPromises = seedData.quizzes.map(function(quiz) {
                    return createQuizStep(quiz);
                });

                Promise.all(quizPromises).then(function(quizzes) {
                    console.log("===QUIZ CREATED===")
                });
            })
        });
    });

    var createQuestion = function(question) {
        return new Promise(function(resolve, reject) {
            Category.findOne({ name: question.category }, function(err, category) {
                if (err) return reject(err);
                question.category = category._id;
                Question.create(question, function(err) {
                    if (err) return reject(err);
                    resolve();
                })
            })

        })
    };


    var createQuizStep = function(quiz) {
        return new Promise(function(resolve, reject) {
            Team.find({}).limit(3).select({ 'name': 0, 'password': 0, 'picture': 0, '__v': 0 }).exec(function(err, teams) {
                if (err) reject(err);
                quiz.teams = teams;
                var promises1 = quiz.rounds.map(function(round) {
                    return new Promise(function(resolve, reject) {
                        Category.find({}).limit(3).select({ '__v': 0, 'name': 0 }).exec(function(err, categories) {
                            if (err) reject(err);
                            round.categories = categories;
                            resolve(round)
                        })
                    })
                })

                Promise.all(promises1).then(function(rounds) {
                    var promises2 = rounds.map(function(round) {
                        return new Promise(function(resolve, reject) {
                            Question.find({}).limit(12).select({
                                'question': 0,
                                'answer': 0,
                                'category': 0,
                                '__v': 0
                            }).exec(function(err, questionsResult) {
                                if (err) reject(err);
                                    //add questions
                                var questionPromises = round.questions.map(function(question) {
                                    return new Promise(function(resolve, reject) {
                                        question.questionId = questionsResult[0]._id;
                                        questionsResult.splice(0, 1);
                                        //add answers to teams
                                        Team.find({}).limit(2).select({
                                            '__v': 0,
                                            'name': 0,
                                            'password': 0,
                                            'picture': 0
                                        }).exec(function(err, teams) {
                                            if (err) reject(err)
                                            if (question.status !== 'Queued') {
                                                question.answers[0].teamId = teams[0]
                                                question.answers[1].teamId = teams[1]
                                            }

                                            resolve(question);
                                        })

                                    })

                                });

                                Promise.all(questionPromises).then(function(questions) {
                                    round.questions = questions;
                                    resolve(rounds);
                                })
                            })
                        })
                    })

                    Promise.all(promises2).then(function(rounds) {
                        quiz.rounds = rounds[0];
                        Quiz.create(quiz, function(err) {
                            if (err) done(err);
                            done();
                        });
                        resolve();
                    });

                });

            });
        });
    };

}

exports.refreshDatabase = refreshDatabase;
exports.connect = connect;

/*
  check whether run from the command line
  if so, connect and refresh database
*/
if (require.main === module) {
    connect();
    refreshDatabase();
}

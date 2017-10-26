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

mongoose.connect('mongodb://localhost/' + dbName);


Quiz.remove({}, function (err) {
  if (err) return done(err);

  Team.remove({}, function (err) {
    if (err) return done(err);

    Question.remove({}, function (err) {
      if (err) return done(err);

      Category.remove({}, function (err) {
        if (err) return done(err);

        Team.create(seedData.teams, function (err) {
          if (err) return done(err);
          console.log();
          console.log("===TEAM CREATED===")

          Category.create(seedData.categories, function (err) {
            if (err) return done(err);
            console.log("===CATEGORY CREATED===")

            var questionPromises = seedData.questions.map(function(question){
              return createQuestion(question);
            });

            Promise.all(questionPromises).then(function(){
              console.log("===QUESTION CREATED===")





              done();
            })
          });
        });
      });
    });
  });
});


var createQuestion = function(question) {
  return new Promise(function (resolve, reject) {
    Category.findOne({name: question.category}, function (err, category) {
      if (err) return reject(err);
      question.category = category._id;
      Question.create(question, function (err) {
        if (err) return reject(err);
        console.log("created a question")
        resolve();
      })
    })
  })
}


function done(err) {
  if (err) console.log("Error found! " + err);
  mongoose.connection.close();
}

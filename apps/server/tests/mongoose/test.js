var mocha = require('mocha')
var chai = require('chai'),
  expect = chai.expect;
var mongoose = require('mongoose')
var id = require('mongoose').Types.ObjectId();
require('../../mongoose/team')
require('../../mongoose/question')
require('../../mongoose/category')
require('../../mongoose/quiz')

var Team = mongoose.model('Team')
var Question = mongoose.model('Question')
var Category = mongoose.model('Category')
var Quiz = mongoose.model('Quiz')

/**
 * Tests for the Team schema
 */
describe('team', function () {
  it('should be invalid if name is empty', function (done) {
    var team = new Team();

    team.validate(function (err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if password is empty', function (done) {
    var team = new Team();

    team.validate(function (err) {
      expect(err.errors.password).to.exist;
      done()
    })
  })
  it('should be invalid if picture is empty', function (done) {
    var team = new Team();
    team.validate(function (err) {
      expect(err.errors.picture).to.exist;
      done()
    })
  })
  it('Should pass if required fields are provided', function (done) {
    var team = new Team({name: "somename", password: "secret", picture: "somelink"})
    team.validate(function (err) {
      expect(err).to.be.null
      done();
    })
  })
});
/**
 * Tests for the question schema
 */
describe('question', function () {
  it('should be invalid if question is empty', function (done) {
    var question = new Question();

    question.validate(function (err) {
      expect(err.errors.question).to.exist;
      done();
    });
  });

  it('should be invalid if answer is empty', function (done) {
    var question = new Question();

    question.validate(function (err) {
      expect(err.errors.answer).to.exist;
      done();
    });
  });

  it('should be invalid if category is empty', function (done) {
    var question = new Question();

    question.validate(function (err) {
      expect(err.errors.category).to.exist;
      done();
    });
  });

  it('should be fine if required fields are provided', function (done) {
    var question = new Question({
      question: "what is the meaning of life",
      answer: "unknown",
      category: mongoose.Types.ObjectId("asdlkfjasdff")
    })


    question.validate(function (err) {
      expect(err).to.be.null;
      done()
    })
  })
})

/**
 * Tests for the category schema
 */
describe('category', function () {
  it('should be invalid if name is empty', function (done) {
    var category = new Category();
    category.validate(function (err) {
      expect(err.errors.name).to.exist;
      done()
    })
  })

  it('should be fine when all required fields are provided', function(done){
    var category = new Category({name: "nice"});
    category.validate(function(err){
      expect(err).to.be.null;
      done();
    })
  })

})

/**
 * Tests for the quiz schema
 */
describe('quiz', function () {

  it('should be invalid when name is empty', function(done){
    var quiz = new Quiz();
    quiz.validate(function(err){
      expect(err.errors.name).to.exist;
      done();
    })
  })

  it('should be invalid when password is empty', function(done){
    var quiz = new Quiz();
    quiz.validate(function(err){
      expect(err.errors.password).to.exist;
      done();
    })
  })

  it('should be invalid when status is empty', function(done){
    var quiz = new Quiz();
    quiz.validate(function(err){
      expect(err.errors.status).to.exist;
      done();
    })
  })


})

var mocha = require('mocha')
var chai = require('chai'),
    expect = chai.expect;
var mongoose = require('mongoose')
require('../../mongoose/team')

var Team = mongoose.model('Team')

/**
 * Tests for the Team schema
 */
describe('team', function() {
  it('should be invalid if name is empty', function(done) {
    var team = new Team();

    team.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if password is empty', function(done) {
    var team = new Team();

    team.validate(function(err) {
      expect(err.errors.password).to.exist;
      done()
    })
  })
  it('should be invalid if picture is empty', function(done){
    var team = new Team();
    team.validate(function(err){
      expect(err.errors.picture).to.exist;
      done()
    })
  })
  it('Should pass if required fields are provided', function(done){
    var team = new Team({name: "somename", password:"secret", picture:"somelink"})
    team.validate(function(err){
      expect(err.errors).to.be.empty
    })
    done();
  })
});
/**
 * Tests for the question schema
 */
describe('question', function(){
  it('should be invalid if name is empty', function(done) {
    var team = new Team();

    team.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

})

/**
 * Tests for the category schema
 */
describe('category', function(){


})

/**
 * Tests for the quiz schema
 */
describe('quiz', function(){


})

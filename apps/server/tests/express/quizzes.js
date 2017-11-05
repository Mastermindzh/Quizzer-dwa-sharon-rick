process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let express = require('express');
let config = require('../../config.js')
let mongoose = require('../../modules/mongoose.js');
let server = require('../../server.js')
let should = chai.should();
let {
  shouldHaveAndEqual
} = require('../helpers.js')

chai.use(chaiHttp)

const firstTestObject = {
  "_id": "59fe0b41c903430089fe896a",
  "name": "quizthatdoesntexist",
  "code": "1234",
  "status": "Open",
  "__v": 0,
  "rounds": [],
  "teams": []
}

const secondTestObject = {
  "name": "test",
  "code": "12345",
  "status": "Playing",
  "rounds": [],
  "teams": []
}
// const secondTestObject = {
// second Test object is at the bottom of the file (warning: it is HUGE)

describe('Quizzes', () => {

  beforeEach((done) => {
    mongoose.Quiz.remove({}).then(response => {
      var testObject1 = new mongoose.Quiz(firstTestObject).save()
      var testObject2 = new mongoose.Quiz(secondTestObject).save()

      Promise.all([testObject1, testObject2]).then(result => {
        done();
      }).catch(err => {
        console.log(err)
      })
    })
  });

  describe('/GET quizzes', () => {
    it('it should GET all the quizzes', (done) => {
      chai.request(server)
        .get('/quizzes/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('/GET/:id quizzes', () => {
    it('it should GET a specific quizzes by id', (done) => {
      chai.request(server)
        .get(`/quizzes/${firstTestObject._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          shouldHaveAndEqual(res, 'name', firstTestObject.name);
          shouldHaveAndEqual(res, '_id', firstTestObject._id);
          shouldHaveAndEqual(res, 'code', firstTestObject.code);
          shouldHaveAndEqual(res, 'status', firstTestObject.status);
          done();
        });
    });
  });

  describe('/POST quizzes', () => {
    it('it should not POST a quiz without the code field', (done) => {
      let quiz = Object.assign({}, secondTestObject);
      delete quiz.code

      chai.request(server)
        .post('/quizzes/')
        .send(quiz)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should POST a quiz ', (done) => {
      let quiz = Object.assign({}, secondTestObject);
      quiz.code = "newuniquecode"
      chai.request(server)
        .post('/quizzes/')
        .send(quiz)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          shouldHaveAndEqual(res, 'name', quiz.name)
          shouldHaveAndEqual(res, 'code', quiz.code)
          done();
        });
    });
  });
});

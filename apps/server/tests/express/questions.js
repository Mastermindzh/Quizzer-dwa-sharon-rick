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
  "_id": "59fcc21dcdad0e5fc3879122",
  "question": "In literature, who owns a cat called Crookshanks?",
  "answer": "Hermione Granger (from the Harry Potter stories)",
  "category": "59fcc21dcdad0e5fc3879118",
  "__v": 0
}

const secondTestObject = {
  "_id": "59fcc21dcdad0e5fc3879121",
  "question": "Who has written a series of letters entitled `Dear Fatty` in the form of an autobiography?",
  "answer": "Dawn French",
  "category": "59fcc21dcdad0e5fc3879118",
  "__v": 0
}

describe('Questions', () => {

  beforeEach((done) => {
    mongoose.Question.remove({}).then(response => {
      var testObject1 = new mongoose.Question(firstTestObject).save()
      var testObject2 = new mongoose.Question(secondTestObject).save()

      Promise.all([testObject1, testObject2]).then(result => {
        done();
      }).catch(err => {
        console.log(err)
      })
    })
  });

  describe('/GET question', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/questions/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('/GET/:id question', () => {
    it('it should GET a specific question by id', (done) => {
      chai.request(server)
        .get(`/questions/${firstTestObject._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          shouldHaveAndEqual(res, 'question', firstTestObject.question);
          shouldHaveAndEqual(res, 'answer', firstTestObject.answer);
          shouldHaveAndEqual(res, 'category', firstTestObject.category);
          done();
        });
    });
  });
});

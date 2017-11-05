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
  "_id": "59fcc21dcdad0e5fc3879118",
  "name": "Art and Literature",
  "__v": 0
}

const secondTestObject = {
  "_id": "59fcc21dcdad0e5fc3879119",
  "name": "General Knowledge",
  "__v": 0
}

describe('Categories', () => {

  beforeEach((done) => {
    mongoose.Category.remove({}).then(response => {
      var testObject1 = new mongoose.Category(firstTestObject).save()
      var testObject2 = new mongoose.Category(secondTestObject).save()

      Promise.all([testObject1, testObject2]).then(result => {
        done();
      }).catch(err => {
        console.log(err)
      })
    })
  });

  describe('/GET Categories', () => {
    it('it should GET all the Categories', (done) => {
      chai.request(server)
        .get('/Categories/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('/GET/:id Categories', () => {
    it('it should GET a specific Categories by id', (done) => {
      chai.request(server)
        .get(`/Categories/${firstTestObject._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          shouldHaveAndEqual(res, 'name', firstTestObject.name);
          shouldHaveAndEqual(res, '_id', firstTestObject._id);
          done();
        });
    });
  });
});

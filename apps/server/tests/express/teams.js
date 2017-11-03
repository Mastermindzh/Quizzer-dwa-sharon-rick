process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let express = require('express');
let config = require('../../config.js')
let mongoose = require('../../modules/mongoose.js');
let server = require('../../server.js')
let should = chai.should();
let {shouldHaveAndEqual} = require('../helpers.js')

chai.use(chaiHttp)

const firstTestObject = {
  "_id": "59fcc21ccdad0e5fc3879115",
  "name": "Team1",
  "password": "1234",
  "picture": "somefilestring",
  "__v": 0
}

const secondTestObject = {
  "_id": "59fcc21ccdad0e5fc3879116",
  "name": "Team2",
  "password": "1a2b",
  "picture": "somefilestring",
  "__v": 0
}

describe('Teams', () => {

  beforeEach((done) => {
    mongoose.Team.remove({}).then(response => {
      var team1 = new mongoose.Team(firstTestObject).save()
      var team2 = new mongoose.Team(secondTestObject).save()

      Promise.all([team1, team2]).then(result => {
        done();
      }).catch(err => {
        console.log(err)
      })
    })
  });

  describe('/GET team', () => {
    it('it should GET all the teams', (done) => {
      chai.request(server)
        .get('/teams/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('/GET/:id team', () => {
    it('it should GET a specific team by id', (done) => {
      chai.request(server)
        .get('/teams/' + firstTestObject._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          shouldHaveAndEqual(res,'name',firstTestObject.name);
          shouldHaveAndEqual(res,'password',firstTestObject.password);
          shouldHaveAndEqual(res,'picture',firstTestObject.picture);
          shouldHaveAndEqual(res,'_id',firstTestObject._id);
          done();
        });
    });
  });

});

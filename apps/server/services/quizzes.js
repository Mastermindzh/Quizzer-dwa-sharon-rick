'use strict'
var mongoose = require('./../modules/mongoose.js');
var questions = require('./questions.js')
var teamService = require('./teams.js')
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get all Quizzes from the database
 *
 */
exports.getAllQuizzes = function () {
  return mongoose.Quiz.find({}).exec();
};

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
function getQuiz(id) {
  return mongoose.Quiz.findOne({
    _id: id
  }).exec();
};
exports.getQuiz = getQuiz;

/**
 * Get a specific quiz from the database
 * @param req, request object that contains the id of the requested quiz
 */
exports.getQuizByCode = function (code) {
  return mongoose.Quiz.findOne({
    code: code
  }).exec();
}

/**
 * Update the quiz according to the id and data provided.
 * @param req, request object that contains the id and data of the quiz that has to be updated.
 */
exports.updateQuizStatus = function (quizId, teams, status) {
  console.log("teams for db function: "+teams)
  return mongoose.Quiz.findOne({_id: new ObjectId(quizId)}, function (err, quiz) {
    quiz.status = status;
    quiz.teams = teams;
    quiz.save();
  }).exec();
};

/**
 * Updates the quiz with a new round + categories beloning to that round.
 */
exports.newRound = function (quizId, categories) {
  return mongoose.Quiz.findOne({_id: new ObjectId(quizId)}, function (err, quiz) {
    console.log("Quiz found: "+JSON.stringify(quiz))
    var id = quiz.rounds.length+1
    var newround = quiz.rounds.create({_id: id, categories: categories})
    quiz.rounds.push(newround);
    quiz.markModified('rounds')
    console.log("new quiz: "+JSON.stringify(quiz))
    quiz.save(err => {
      console.log(err);
    });
  }).exec();
};


/**
 * Create a new quiz with the data provided in req param.
 * @param req, request object that contains the data of the quiz that has to be created.
 */
exports.createQuiz = function (req) {
  let quiz = new mongoose.Quiz({
    name: req.body.name,
    code: req.body.code,
    status: req.body.status
  });

  return quiz.save();
};

/**
 * checks wether team is in quiz
 * @param team
 * @param quiz
 */
exports.teamInQuiz = (team, quiz) => {
  return quiz.teams.indexOf(team.id) > -1
}

/**
 * Gets current question
 * @param id (quiz id)
 */
exports.getCurrentQuestion = function (id) {
  return new Promise(function (fullfill, reject) {
    getQuiz(id).then(quiz => {
      getCurrentDbQuestion(quiz).then(response => {
        questions.getQuestion(response.questionId)
          .then(question => {
            fullfill(question);
          }).catch(err => {
          reject("no current question")
        })
      })
    }).catch(err => {
      reject("no current question")
    })
  })
}

function getCurrentDbQuestion(quiz) {
  return new Promise(function (fullfill, reject) {
    let currQuestion = {};
    quiz.rounds.some(round => {
      let answer = round.questions.filter(question => (question.status === "Open"))
      if (answer.length !== 0) { // if answer isn't empty
        currQuestion = answer[0]; // return element
        return true; // some will exit if we return true :)
      } else {
        return false;
      }
    });
    fullfill(currQuestion);
  })
}

exports.getCurrentDbQuestion = getCurrentDbQuestion

/**
 * returns the id of the current round
 * @param quiz
 */
function getCurrentRound(quiz) {
  var currentRound = 0;
  quiz.rounds.some(round => {

    let answer = round.questions.filter(question => (question.status === "Open"))
    if (answer.length !== 0) { // if answer isn't empty
      currentRound = round;
      return true; // some will exit if we return true :)
    } else {
      return false;
    }
  });

  return currentRound
}

exports.getCurrentRound = getCurrentRound


/**
 * get finished rounds from quiz (round has all questions closed)
 * @param {*} quiz quiz to get finished rounds from
 */
function getFinishedRounds(quiz) {

  let nrOfRoundsFinished = 0;

  for (let i = 0; i < quiz.rounds.length; i++) {
    if (quiz.rounds[i].questions.every(function (element, index, array) {
        return element.status.toLowerCase() === "closed"
      })) {
      nrOfRoundsFinished++;
    }
  }
  quiz.rounds.length = nrOfRoundsFinished;

  return quiz.rounds
}


/**
 * Get current quiz score
 */
exports.getScore = quizId => {
  return new Promise((fullfill, reject) => {
    getQuiz(quizId).then(quiz => {

      let rounds = getFinishedRounds(quiz);
      let teams = getEmptyScoreArray(quiz.teams);
      let finalScores = getEmptyScoreArray(quiz.teams)
      let results = []

      for (let roundNr = 0; roundNr < rounds.length; roundNr++) {
        for (let questionNr = 0; questionNr < rounds[roundNr].questions.length; questionNr++) {
          for (let answerNr = 0; answerNr < rounds[roundNr].questions[questionNr].answers.length; answerNr++) {
            let answer = rounds[roundNr].questions[questionNr].answers[answerNr];
            if (answer.approved) {
              teams[answer.teamId].rounds[roundNr]++;
            }
          }
        }
      }

      rounds.forEach((round, roundIndex) => {
        let roundResult = [];
        quiz.teams.forEach(team => {
          roundResult.push({
            team: team,
            score: teams[team].rounds[roundIndex]
          })
        })
        // sort descending (highest nr correct questions first)
        roundResult.sort(function compare(a, b) {
          if (a.score < b.score)
            return 1;
          if (a.score > b.score)
            return -1;
          return 0;
        })
        results.push(roundResult)
      })

      //award points
      results.forEach((round, index) => {
        round.forEach((answer, answerIndex) => {
          switch (answerIndex) {
            case 0:
              finalScores[answer.team].rounds[index] += 4
              break;
            case 1:
              finalScores[answer.team].rounds[index] += 2
              break;
            case 2:
              finalScores[answer.team].rounds[index] += 1
              break;
            default:
              finalScores[answer.team].rounds[index] += 0.1
          }
        })
      })

      // make sure teamnames are readable and asign scores
      mapTeamNames(quiz.teams, finalScores).then(result => {
        let finalResult = [];
        quiz.teams.forEach(team => {
          finalResult.push({
            team: result[team].teamId,
            score: result[team].rounds.reduce((a, b) => a + b, 0)
          })
        })

        fullfill(finalResult)
      }).catch(err => {
        reject("cant find team names")
      })
    }).catch(err => {
      console.log(err);
      reject('no such quiz')
    })
  })
}

function mapTeamNames(teamsInQuiz, scoreTableToMap) {
  return new Promise((fullfill, reject) => {
    Promise.all(teamsInQuiz.map(function (team, i) {
      return teamService.getTeam(team)
    })).then(response => {
      response.forEach(team => {
        scoreTableToMap[team._id].teamId = team.name;
      })
      fullfill(scoreTableToMap)
    })
  })
}

function getEmptyScoreArray(inputTeams) {
  let teams = [];
  // create array with teams (all scores 0)
  inputTeams.forEach(team => {
    teams[team] = {
      teamId: team,
      rounds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  });

  return teams
}






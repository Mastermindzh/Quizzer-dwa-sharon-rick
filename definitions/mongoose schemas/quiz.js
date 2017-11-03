var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.ObjectId,
    ref: 'teams',
    required: true
  },
  answer: {
    type: String,
    minlength: 1, //Empty answers are not allowed
    required: true
  },
  approved: Boolean
})

var questionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'questions',
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Queued'], //Open-> open for submission of answers, Closed -> question is done, Queued -> quizmaster has already determined this question will be in this round.
    required: true
  },
  answers: [answerSchema]
})

var roundSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  categories: [{
    type: mongoose.Schema.ObjectId,
    ref: 'categories',
  }],
  questions: [questionSchema]
})


var quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Playing'], //Open -> open for submissions, Closed -> quiz night is over, Playing -> Quiz night is being played
    required: true
  },
  teams: [{
    type: mongoose.Schema.ObjectId,
    ref: 'teams'
  }],
  rounds: [roundSchema]
});

quizSchema.path('rounds').schema.path('categories').validate(function (categories) {
  if (categories.length !== 3) {
    return false
  }
  return true;
}, 'There need to be three categories in a round.')

quizSchema.path('rounds').schema.path('questions').validate(function (questions) {
  if (questions.length > 12) {
    return false
  }
  return true;
}, 'There cannot be more than 12 questions in a round.')

mongoose.model('Quiz', quizSchema);


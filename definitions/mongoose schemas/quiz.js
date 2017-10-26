var mongoose = require('mongoose');
var quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
  rounds: [
    {
      _id: {
        type: Number,
        required: true
      },
      categories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'categories',
        // validate: {
        //     validator: val => {
        //         return val.length <= 3
        //     }, message: 'too many categories'
        // }
      }],
      questions: [{
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
        answers: [{
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
        }],
        // validate: {
        //     validator: val => {
        //         return val.length <= 12
        //     }, message: 'too many questions!'
        // }
      }]
    }
  ]
});

mongoose.model('Quiz', quizSchema);


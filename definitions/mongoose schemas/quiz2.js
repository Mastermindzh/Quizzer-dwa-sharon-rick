var quizSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
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
    type: Schema.Types.ObjectId,
    ref: 'teams'
  }],
  rounds: [
    {
      _id: {
        type: Number,
        required: true
      },
      categories: [{
        type: Schema.Types.ObjectId,
        ref: 'categories',
        validate: [val => {
          return val.length <= 3
        }, 'too many categories']
      }], //todo category ook geen ref meer maken
      questions: [{
        questionId: {
          type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
        validate: [val => {
          return val.length <= 12
        }, 'too many questions!']
      }]
    }
  ]
});


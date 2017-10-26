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
    rounds: [{
        type: Schema.Types.ObjectId,
        ref: 'rounds'
    }]
});


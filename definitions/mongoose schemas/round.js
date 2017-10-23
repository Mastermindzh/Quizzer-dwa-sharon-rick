var roundSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'categories',
        validate: [val => { return val.length <= 3 }, 'too many categories']
    }],
    questions: [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'questions',
            required: true
        },
        status: {
            type: String,
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
                required: true
            },
            approved: Boolean
        }],
        validate: [val => { return val.length <= 12 }, 'too many questions!']
    }]
});

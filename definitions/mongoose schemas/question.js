var questionSchema = new Schema({
    questionId: Schema.Types.ObjectId,
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    category: {
        type: Schema.types.ObjectId,
        ref: 'categories',
        required: true
    }
});


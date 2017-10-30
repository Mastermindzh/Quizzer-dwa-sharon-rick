var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  }
});

mongoose.model('Question', questionSchema);

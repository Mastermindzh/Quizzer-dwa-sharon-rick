var mongoose = require('mongoose');
var teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});

mongoose.model('Team', teamSchema);

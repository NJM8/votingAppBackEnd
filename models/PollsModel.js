const mongoose = require('mongoose');

const pollsSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  options: [{
    type: String
  }],
  votes: [{
    type: Number
  }],
  colors: [{
    type: String
  }],
  voters: []
},{timestamps: true}
);

module.exports = mongoose.model('Polls', pollsSchema);

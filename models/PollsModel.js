const mongoose = require('mongoose');

const pollsSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  options: [{
    optionName: String,
    details: {
      optionColor: String,
      optionNumVotes: Number
    }
  }],
  voters: []
},{timestamps: true}
);

module.exports = mongoose.model('Polls', pollsSchema);

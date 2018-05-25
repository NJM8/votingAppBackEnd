const mongoose = require('mongoose');

const pollsSchema = new mongoose.Schema({
  name: String,
  options: [{
    option: String,
    votes: Number
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true}
);

module.exports = mongoose.model('Polls', pollsSchema);

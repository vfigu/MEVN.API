let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('users', usersSchema);

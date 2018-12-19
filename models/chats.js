const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let ChatSchema = new Schema({
  room: String,
  username: String,
  message: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('chats', ChatSchema);

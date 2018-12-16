const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let ChatSchema = new Schema({
  name: String,
  room : {
    type: Schema.Types.ObjectId,
    ref: 'lists'
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  message: String,
});

module.exports = mongoose.model('chats', ChatSchema);

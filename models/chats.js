let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let chatsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  room : {
    type: Schema.Types.ObjectId,
    ref: 'boxes'
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  message: String,
});

module.exports = mongoose.model('chats', chatsSchema);

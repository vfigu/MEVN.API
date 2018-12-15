let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let ChatSchema = new Schema({
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

module.exports = mongoose.model('chats', ChatSchema);

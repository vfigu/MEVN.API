let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let BoxSchema = new Schema({
  id: Number,
  name: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('boxes', BoxSchema);

let mongoose = require('mongoose');

let boxesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('boxes', boxesSchema);

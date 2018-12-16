const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let ListSchema = new Schema({
  name: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('lists', ListSchema);

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  username: { type: String, required: true, index: 2 },
  password: { type: String, required: true },
  url: String,
  date_created: {
    type: Date,
    default: Date.now
  }
});

// password hashing
UserSchema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.getAuthenticated = function(username, password, cb) {
  this.findOne({ username: username }, function(err, user) {
    if (err) return cb(err);

    // make sure the user exists
    if (!user) {
      return cb(null, null, "User not found");
    }

    // test for a matching password
    user.comparePassword(password, function(err, isMatch) {
      if (err) return cb(err);
      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        return cb(null, user);
      }
    });
  });
};

module.exports = mongoose.model('users', UserSchema);

var express = require('express');
var users = require('../models/users.js');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

/* CREATE user */
router.post('/register', function(req, res, next) {
  users.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET authentication. */
router.post('/login', function(req, res, next) {
  // creates user instance of matching username
  users.findOne({ username: req.body.username }, function(err, user) {
    if (err) return next(err);

    // make sure the user exists
    if (!user) {
      res.json({
        success: false,
        message: "Login Failed: User not found"
      });
    }
    else {
      // test for a matching password
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) return next(err);

        // check if the password was a match
        if (isMatch) {
          console.log("Login successful");

          // create token
          const payload = {
            id: user._id,
            username: user.username,
            date_created: {
              type: Date,
              default: Date.now
            },
          };
          const token = jwt.sign(payload, config.key, {
            expiresIn: '2880m' // expires in 48 hours
          });

          // pass authentication and return token to user
          res.json({
            success: true,
            message: "Login successful",
            token: token
          });
        }
        else {
          res.json({
            success: false,
            message: "Login Failed: Invalid password"
          });
        }
      });
    }
  });
});

module.exports = router;

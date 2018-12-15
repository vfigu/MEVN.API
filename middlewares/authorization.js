const jwt = require('jsonwebtoken');
const config = require('../config');

// route middleware to verify a token
var authorization = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies token with key and checks expiration
    jwt.verify(token, config.key, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Unauthorized: Invalid token'
        });
      }
      else {
        // user is authenticated
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized: Could not find token'
    });
  }
};

module.exports = authorization;

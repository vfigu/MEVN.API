var jwt = require('jsonwebtoken');
var config = require('../config');

// route middleware to verify a token
var authorization = function (req, res, next) {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token || req.headers['token'];
  var header = req.headers['authorization'];
  var bearer = header.split(' ')[0];
  var token = header.split(' ')[1];

  if (bearer !== 'Bearer') {
    return res.json({
      success: false,
      message: 'Unauthorized: Invalid type'
    });
  }
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
    return res.status(401).send({
      success: false,
      message: 'Unauthorized: Could not find token'
    });
  }
};

module.exports = authorization;

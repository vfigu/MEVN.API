var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
var authorization = require('../middlewares/authorization');

router.use(authorization);

/* GET users */
router.get('/', function(req, res, next) {
  users.find(function (err, products) {
     if (err) return next(err);
      res.json(products);
  });
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
  users.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE user information */
router.put('/:id', function(req, res, next) {
  users.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE user */
router.delete('/:id', function(req, res, next) {
  users.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

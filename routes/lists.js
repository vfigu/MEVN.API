var express = require('express');
var router = express.Router();
var lists = require('../models/lists.js');
var authorization = require('../middlewares/authorization');

router.use(authorization);

/* GET lists */
router.get('/', function(req, res, next) {
  lists.find(function (err, products) {
    if (err) return next(err);
  });
});

/* GET box by id */
router.get('/:id', function(req, res, next) {
  lists.findById(req.params.id, function (err, post) {
    if (err) return next(err);
  });
});

/* CREATE box */
router.post('/', function(req, res, next) {
  lists.create(req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* UPDATE box information */
router.put('/:id', function(req, res, next) {
  lists.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* DELETE box */
router.delete('/:id', function(req, res, next) {
  lists.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

module.exports = router;

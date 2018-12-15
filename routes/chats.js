var express = require('express');
var router = express.Router();
var chats = require('../models/chats.js');


router.use(authorization);

/* GET ALL chats */
router.get('/', function(req, res, next) {
  chats.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET chat by id */
router.get('/:id', function(req, res, next) {
  chats.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Create chat */
router.post('/', function(req, res, next) {
  chats.create(req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* UPDATE chat */
router.put('/:id', function(req, res, next) {
  chats.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* DELETE chat */
router.delete('/:id', function(req, res, next) {
  chats.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

module.exports = router;

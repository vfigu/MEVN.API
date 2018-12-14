let express = require('express');
let router = express.Router();
let boxes = require('../models/boxes.js');

/* GET boxes */
router.get('/', function(req, res, next) {
  boxes.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET box by id */
router.get('/:id', function(req, res, next) {
  boxes.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE box */
router.post('/', function(req, res, next) {
  boxes.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE box information */
router.put('/:id', function(req, res, next) {
  boxes.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE box */
router.delete('/:id', function(req, res, next) {
  boxes.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

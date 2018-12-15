let express = require('express');
let router = express.Router();
let boxes = require('../models/boxes.js');


router.use(authorization);

/* GET boxes */
router.get('/', function(req, res, next) {
  boxes.find(function (err, products) {
    if (err) return next(err);
  });
});

/* GET box by id */
router.get('/:id', function(req, res, next) {
  boxes.findById(req.params.id, function (err, post) {
    if (err) return next(err);
  });
});

/* CREATE box */
router.post('/', function(req, res, next) {
  boxes.create(req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* UPDATE box information */
router.put('/:id', function(req, res, next) {
  boxes.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

/* DELETE box */
router.delete('/:id', function(req, res, next) {
  boxes.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
  });
});

module.exports = router;

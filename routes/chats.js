const express = require('express');
const router = express.Router();
const chats = require('../models/chats.js');
const app = express();
const server = require('http').createServer(app);
const io = require('../node_modules/socket.io')(server);
const port = 8000;
// const authorization = require('../middlewares/authorization');
//
//
// router.use(authorization);

console.log('Listening for connections on port ' + port);

io.on('connection', function(socket) {
    console.log('Socket connected');
    socket.emit('fromServer', {id: port}); // send message fromServer to client

    socket.on('fromClient', function(data) { // listen for fromClient message
        console.log('Connected to Client ' + data.id);
        socket.emit('Handshake'); // send message fromServer to client
    });

    socket.on('Handshake', function() { // listen for fromServer message
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });
});

/* GET ALL chats */
router.get('/', function(req, res, next) {
  chats.find(req.body, function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({$natural:-1}).limit(50);
});

// /* GET chat by id */
// router.get('/:id', function(req, res, next) {
//   chats.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* Create chat */
router.post('/', function(req, res, next) {
  chats.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE chat */
router.put('/:id', function(req, res, next) {
  chats.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE chat */
router.delete('/:id', function(req, res, next) {
  chats.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

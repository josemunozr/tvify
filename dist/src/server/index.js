'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _api = require('src/server/api');

var _api2 = _interopRequireDefault(_api);

var _lib = require('src/server/lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);
var port = process.env.PORT || 3000;

_mongoose2.default.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tvify');

app.use(_express2.default.static('public'));
app.use('/api', _api2.default);

io.on('connection', function (socket) {
  console.log('Connected ' + socket.id);

  socket.on('vote', function (id) {
    (0, _lib.incrementVote)(id, function (err, vote) {
      if (err) return socket.emit('vote:error', err);

      socket.emit('vote:done', vote);
    });
  });
});

server.listen(port, function () {
  return console.log('Server listening on port ' + port);
});
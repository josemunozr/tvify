'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('src/server/api');

var _api2 = _interopRequireDefault(_api);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tvify');

app.use(_express2.default.static('public'));

app.use('/api/votes', function (req, res, next) {
  console.log('Middleware 1');
  next();
});

app.use('/api/votes', function (req, res, next) {
  console.log('Middleware 2');
  next();
});

app.use('/api', _api2.default);

app.listen(process.env.PORT || 3000, function () {
  return console.log('Servidor iniciado con Express port 3000');
});
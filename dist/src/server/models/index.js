'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VoteSchema = new _mongoose2.default.Schema({
  showId: { type: Number, required: true, unique: true },
  count: { type: Number, default: 0 }
});

exports.default = _mongoose2.default.model('Vote', VoteSchema);
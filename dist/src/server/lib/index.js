'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incrementVote = incrementVote;
exports.addVotes = addVotes;
exports.getVotes = getVotes;

var _models = require('src/server/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function incrementVote(id, callback) {
  _models2.default.findOne({ showId: id }, function (err, doc) {
    if (!err && doc) {
      doc.count = doc.count + 1;
      doc.save(function (err) {
        if (err) return callback(err);
        callback(null, doc);
      });
    } else {
      (function () {
        var vote = new _models2.default();
        vote.showId = id;
        vote.count = 1;
        vote.save(function (err) {
          if (err) return callback(err);
          callback(null, vote);
        });
      })();
    }
  });
}

function addVotes(shows, callback) {
  getVotes(function (err, votes) {
    if (err) votes = [];

    shows = shows.map(function (show) {
      var vote = votes.filter(function (vote) {
        return vote.showId === show.id;
      })[0];
      show.count = vote ? vote.count : 0;
      return show;
    });

    callback(shows);
  });
}

function getVotes(callback) {
  _models2.default.find({}, function (err, votes) {
    if (err) return callback(err);
    callback(null, votes);
  });
}
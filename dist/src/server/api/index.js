'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tvMaze = require('tv-maze');

var _tvMaze2 = _interopRequireDefault(_tvMaze);

var _models = require('src/server/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var client = _tvMaze2.default.createClient();

function addVotes(shows, callback) {
  _models2.default.find({}, function (err, votes) {
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

router.get('/shows', function (req, res) {
  client.shows(function (err, shows) {
    if (err) {
      return res.sendStatus(500).json(err);
    }

    addVotes(shows, function (shows) {
      res.json(shows);
    });
  });
});

router.get('/search', function (req, res) {
  var query = req.query.q;

  client.search(query, function (err, shows) {
    if (err) {
      return res.sendStatus(500).json(err);
    }

    shows = shows.map(function (show) {
      return show.show;
    });

    addVotes(shows, function (shows) {
      res.json(shows);
    });
  });
});

// GET  /api/votes
router.get('/votes', function (req, res) {
  _models2.default.find({}, function (err, docs) {
    if (err) {
      return res.sendStatus(500).json(err);
    }
    res.json(docs);
  });
});

// POST /api/vote/123
router.post('/vote/:id', function (req, res) {
  var onSave = function onSave(vote) {
    return function (err) {
      if (err) {
        return res.sendStatus(500).json(err);
      }
      res.json(vote);
    };
  };
  debugger;
  var id = req.params.id;

  _models2.default.findOne({ showId: id }, function (doc) {
    if (doc) {
      // actualizo este doc
      doc.count = doc.count + 1;
      doc.save(onSave(doc));
    } else {
      // creo un doc nuevo y le pongo count 1
      var vote = new _models2.default();
      vote.showId = id;
      vote.count = 1;
      vote.save(onSave(vote));
    }
  });
});

exports.default = router;
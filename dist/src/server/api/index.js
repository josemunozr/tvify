'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tvMaze = require('tv-maze');

var _tvMaze2 = _interopRequireDefault(_tvMaze);

var _lib = require('src/server/lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var client = _tvMaze2.default.createClient();

router.get('/shows', function (req, res) {
  client.shows(function (err, shows) {
    if (err) {
      return res.sendStatus(500).json(err);
    }

    (0, _lib.addVotes)(shows, function (shows) {
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

    (0, _lib.addVotes)(shows, function (shows) {
      res.json(shows);
    });
  });
});

// GET  /api/votes
router.get('/votes', function (req, res) {
  (0, _lib.getVotes)(function (err, docs) {
    if (err) {
      return res.sendStatus(500).json(err);
    }
    res.json(docs);
  });
});

// POST /api/vote/123
router.post('/vote/:id', function (req, res) {
  var id = req.params.id;

  (0, _lib.incrementVote)(id, function (err, vote) {
    if (err) {
      return res.sendStatus(500).json(err);
    }
    res.json(vote);
  });
});

exports.default = router;
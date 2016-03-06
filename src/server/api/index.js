import express from 'express'
import tvmaze from 'tv-maze'

const router = express.Router()
const client = tvmaze.createClient()

import Vote from 'src/server/models'

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    res.json(shows)
  })
})

// GET  /api/votes
router.get('/votes', (req, res) => {
  console.log('GET /votes')
  Vote.find({}, (err, docs) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    res.json(docs)
  })
})

// POST /api/vote/123
router.post('/vote/:id', (req, res) => {
  var onSave = function (vote) {
    return function (err) {
      if (err) {
        return res.sendStatus(500).json(err)
      }
      res.json(vote)
    }
  }

  let id = req.params.id

  Vote.findOne({ showId: id }, (doc) => {
    if (doc) {
      // actualizo este doc
      doc.count = doc.count + 1
      doc.save(onSave(doc))
    } else {
      // creo un doc nuevo y le pongo count 1
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(onSave(vote))
    }
  })
})

export default router

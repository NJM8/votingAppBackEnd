const express = require('express')
const router = express.Router()
const db = require('../models')

router
  .route('/newPoll')
  .post((req, res, next) => {
    db.Polls.create(req.body.newPoll).then(poll => {
      res.status(200).send('New poll added Successfully')
    }).catch(error => {
      res.status(500).send('New poll failed')
      return next(error)
    })
  })

router
  .route('/viewPolls')
  .get((req, res, next) => {
    db.Polls.find().then(polls => {
      res.json(polls)
    }).catch(error => {
      return next(error)
    })
  })

router
  .route('/deletePoll')
  .delete((req, res, next) => {
    db.Polls.findOneAndDelete(req.body.id).then(poll => {
      res.status(200).send('Removal Successful')
    }).catch(error => {
      res.status(500).send('Removal Failed')
      return next(error)
    })
  })

router
  .route('/addNewVote')
  .patch((req, res, next) => {
    db.Polls.findOneAndUpdate({
      _id: req.body.id,
      'options.optionName': req.body.selection
    },
    { $inc: {
      'options.$.details.optionNumVotes': 1
    },
    $push: {
      voters: req.body.voter
    }
    }).then(poll => {
      res.status(200).send('Vote Successful')
    })
      .catch(error => {
        res.status(500).send('Vote Failed')
        return next(error)
      })
  })

router
  .route('/addOptionToPoll')
  .patch((req, res, next) => {
    db.Polls.findOneAndUpdate({
      _id: req.body.id
    }, {
      $push: {
        options: req.body.newOptions
      }
    }).then(poll => {
      res.status(200).send('New options added')
    })
      .catch(error => {
        res.status(500).send('Adding options Failed')
        return next(error)
      })
  })

module.exports = router

const express = require('express');
const router = express.Router();
const db = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

router 
  .route('/newPoll')
  .post((req, res, next) => {
    db.Polls.create(req.body.newPoll).then(poll => {
      res.status(200).send();
    }).catch(error => {
      return next(error);
    })
  })

router
  .route('/viewPolls')
  .get((req, res, next) => {
    db.Polls.find().then(polls => {
      res.json(polls);
    }).catch(error => {
      return next(error);
    })
  })

router
  .route('/voteOnPoll')
  .post((req, res, next) => {
    
  })


module.exports = router;
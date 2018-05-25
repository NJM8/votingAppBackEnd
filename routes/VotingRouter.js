const express = require('express');
const router = express.Router();
const db = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

router 
  .route('/newPoll/:userId')
  .post(authMiddleware.ensureCorrectUser, (req, res, next) => {
    db.Polls.create(req.body.poll).then(poll => {
      res.status(200).json(poll);
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
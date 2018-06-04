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
  .route('/deletePoll')
  .delete((req, res, next) => {
    db.Polls.findOneAndDelete(req.body.id).then(poll => {
      res.status(200).send('Removal Succesful');
    }).catch(error => {
      return next(error);
    })
  })

router
  .route('/voteOnPoll')
  .post((req, res, next) => {
    
  })


module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
var jwt = require('jsonwebtoken');

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
  .route('/addNewVote')
  .patch((req, res, next) => {
    db.Polls.findOne({ _id: req.body.id }).then(poll => {
      const voter = req.body.voter.length > 12 ? jwt.verify(req.body.voter, process.env.SECRET_KEY).user_id : req.body.voter;
      if (!poll.voters.includes(voter)) {
        poll[req.body.optionName].optionNumVotes += 1;
        // poll.voters.push(voter);
        // const currentVote = poll.votes[req.body.location];
        // poll.votes.set(req.body.location, currentVote + 1);
        poll.save();
        res.status(200).send('Vote Successful');
      } else {
        res.status(400).send('You cannot vote twice');
      }
    })
    .catch(error => {
      res.status(400).send('Vote Failed');
    })
  })


module.exports = router;

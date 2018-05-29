var express = require("express");
var router = express.Router();
var db = require("../models")
var jwt = require('jsonwebtoken');

router
  .route('/signin')
  .post((req, res, next) => {
    console.log(req.body);
    db.Users.findOne({ username: req.body.username }).then(user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
          res.status(200).json({ idToken: token })
        } else {
          console.log('wrong password');
          return res.status(401).send('Invalid Password')
        }
      })
    }).catch(error => {
      return res.status(401).send('Invalid Username')
    });
});

router
  .route('/signup')
  .post((req, res, next) => {
    db.Users.create(req.body).then(user => {
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
      res.status(200).json({ idToken: token })
    }).catch(error => {
      if (error.code === 11000) {
        console.log(error.message)
        if (error.message.split(' ').includes('email_1')) {
          return res.status(401).send('Email already taken');
        }
        if (error.message.split(' ').includes('username_1')) {
          return res.status(401).send('Username already taken');
        }
      }
      return next(error);
    })
});


module.exports = router;
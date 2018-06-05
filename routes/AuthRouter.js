var express = require("express");
var router = express.Router();
var db = require("../models")
var jwt = require('jsonwebtoken');

router
  .route('/login')
  .post((req, res, next) => {
    db.Users.findOne({ username: req.body.username }).then(user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
          res.status(200).json({ idToken: token, expiresIn: 86400, message: 'Logged In Successfully' });
        } else {
          return res.status(401).send('Invalid Password');
        }
      })
    }).catch(error => {
      return res.status(401).send('Invalid Username');
    });
});

router
  .route('/signup')
  .post((req, res, next) => {
    db.Users.create(req.body).then(user => {
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
      res.status(200).json({ idToken: token, expiresIn: 86400, message: 'Signed Up Successfully' });
    }).catch(error => {
      if (error.code === 11000) {
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

router
  .route('/verifyUser')
  .post((req, res, next) => {
    try {
      jwt.verify(req.body.idToken, process.env.SECRET_KEY, function(error, decoded) {
        if (decoded) {
          db.Users.findOne({ _id: decoded.user_id }).then(user => {
            const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
            return res.status(200).json({ 
              idToken: token, 
              expiresIn: 86400, 
              username: user.username, 
              message: `Welcome back ${user.username}!` 
            });
          }).catch(error => {
            return next(error);
          });
        } else {
          if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ err: 'login', message: 'Please log in again' });
          }
          return res.status(401).send({ err: 'Invalid Token', message: 'Please log in again' });
        }
      });
    } catch (error) {
      return res.status(401).send({ err: 'Invalid Token', message: 'Please log in again' });
    }
});

module.exports = router;

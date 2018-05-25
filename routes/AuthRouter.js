var express = require("express");
var router = express.Router();
var db = require("../models")
var jwt = require('jsonwebtoken');

router
  .route('/signin')
  .post((req, res, next) => {
    db.Users.findOne({ username: req.body.username }).then(user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
          res.status(200).json({ token: token, userId: user.id, userName: user.username })
        } else {
          res.status(400).send('Invalid Credentials')
        }
      })
    }, function (err) {
      res.status(400).send('Invalid Credentials')
    })
});

router
  .route('/signup')
  .post((req, res, next) => {
    console.log(req);
    db.Users.create(req.body).then(user => {
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
      res.status(200).json({ token: token, userId: user.id, userName: user.username })
    })
});


module.exports = router;
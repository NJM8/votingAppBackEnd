const jwt = require("jsonwebtoken");

exports.loginRequired = function (req, res, next) {
  try {
    jwt.verify(req.body.idToken, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        next();
      } else {
        res.status(401).send('Please log in first')
      }
    });
  } catch (e) {
    res.status(401).send('Please log in first')
  }
}

exports.ensureCorrectUser = function (req, res, next) {
  try {
    jwt.verify(req.body.idToken, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded.user_id === req.params.userId) {
        next();
      } else {
        res.status(401).send('Unauthorized')
      }
    });
  } catch (e) {
    res.status(401).send('Unauthorized')
  }
}

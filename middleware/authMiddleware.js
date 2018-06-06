const jwt = require('jsonwebtoken')

exports.loginRequired = function (req, res, next) {
  try {
    jwt.verify(req.body.idToken, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return next(err)
      }
      if (decoded) {
        next()
      } else {
        res.status(401).send('Please log in first')
      }
    })
  } catch (error) {
    res.status(401).send('Please log in first')
    return next(error)
  }
}

exports.ensureCorrectUser = function (req, res, next) {
  try {
    jwt.verify(req.body.idToken, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return next(err)
      }
      if (decoded.user_id === req.params.userId) {
        next()
      } else {
        res.status(401).send('Unauthorized')
      }
    })
  } catch (error) {
    res.status(401).send('Unauthorized')
    return next(error)
  }
}

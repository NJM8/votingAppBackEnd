const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRouter = require('./routes/AuthRouter');
const votingRouter = require('./routes/VotingRouter');
const dotenv = require('dotenv');
// const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.load();

// app.use(cors());
// app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",  "POST, GET, OPTIONS")
  next();
});
app.use((req, res, next) => { 
  if (req.method === 'OPTIONS') { 
    return res.status(200) 
  } 
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/users', votingRouter);

// catch 404 and send to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  let mode = app.get('env');
  if (mode === 'development') {
    console.log(err);
  }
  return res.status(err.status || 500).send(err);
});

app.listen(PORT, () => {
  console.log(`App is being served on port ${PORT}`);
});

const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URI || "mongodb://localhost/votingApp", {
    useNewUrlParser: true,
  })
  .then(() => {
    return console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

module.exports.Polls = require("./PollsModel");
module.exports.Users = require("./UsersModel");

const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nerdherd");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// const userSeed = [
//   {
//     displayName: 'kshaq',
//     email: 'kshaq777@gmail.com'
//   },
//   {
//     displayName: 'test',
//     email: 'test@test.com'
//   }
// ]

  // db.User
  // .remove({})
  // .then(() => db.User.collection.insertMany(userSeed))
  // .then(data => {
  //   console.log(data.result.n + " records inserted!");
  //   process.exit(0);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

//   db.User.find({}).then(function(dbUser) {
//     let x = res.json(dbUser);
//     console.log(x);
// });

const env = require('dotenv');
env.config();

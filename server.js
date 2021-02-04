var express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const routes = require("./routes");

var app = express();
var PORT = process.env.PORT || 3001;

// Require the models to reflect our database tables
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes for interacting with the DB
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// // Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nerdherd");
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

const userSeed = [
  {
    displayName: 'kshaq',
    email: 'kshaq777@gmail.com'
  },
  {
    displayName: 'test',
    email: 'test@test.com'
  }
]

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

// Connect to the DB
// db.sequelize.sync({force: false}).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

const env = require('dotenv');
env.config();

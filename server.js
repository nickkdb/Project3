var express = require("express");
const path = require("path");

// const mongoose = require("mongoose");
const routes = require("./routes");

var app = express();
var PORT = process.env.PORT || 3001;

// Require the models to reflect our database tables
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Use the public directory to grab the client-side files
// app.use(express.static("public"));

// Routes for interacting with the DB
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// // Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Connect to the DB
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

const env = require('dotenv');
env.config();

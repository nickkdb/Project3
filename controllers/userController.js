const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User.find({}).then(function (dbUser) {
      res.json(dbUser);
    });
  },
  findById: function (req, res) {
    db.User
    .findOne(
      {'email': req.body.email}
  )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
    .find(
      {'email': req.params.id}
  )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    update: function(req, res) {
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User.find({}).then(function (dbUser) {
      res.json(dbUser);
    });
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //   update: function(req, res) {
  //     db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  update: function ({ body, params }) {
    db.User.findbyIdAndUpdate(
      params.id,
      {
        $push: { products: body }
      }
        .then(dbModel => { res.json(dbModel) })
        .catch(err => { res.status(422).json(err) })
    )
  },
  //   remove: function(req, res) {
  //     db.User
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  //     }
  // };
  remove: function (req, res) {
    db.User.findOneAndDelete(
      params.uuid,
      {
        uuid: req.params.uuid
      }
        .then(dbModel => { res.json(dbModel) })
        .catch(err => { res.status(422).json(err) })
    )}
  }
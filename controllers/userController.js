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
        { 'displayName': req.params.id }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
      .find(
        { 'email': req.params.id }
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
  //   update: function(req, res) {
  //     db.User.updateOne(
  //       { '_id': mongojs.ObjectId(req.params.id) },
  //       { $pull: { 'products': { uuid: req.body.proposedToProducts } } }
  //       // { $push: {'products': {uuid: req.body.proposedByProducts } } }
  //   )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
  update: function (req, res) {
    db.User.replaceOne(
      { "products": { uuid: req.body.proposedToProducts} },
      { "products": req.body.proposedByProducts },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
    )
    // .then(dbModel => res.json(dbModel))
    // .catch(err => res.status(422).json(err));
  }
  // update: function(req, res) {
  //   db.User.find(
  //     {'_id': mongojs.ObjectId(req.params.id)}
  //   )
  //   .then(

  //   )
  // }
}

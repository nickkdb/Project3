const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");
const pushToProducts = () => {
    db.User.updateOne(
    { displayName: req.body.proposedTo },
    {
        $push: { products: {$each: proposedByProducts} }
    }
  )
  .then(res => console.log(res))
    .catch(err => console.error(err));
}
const pullByProducts = () => {
  db.User.updateOne(
    { displayName: req.body.proposedBy },
    {
        $pullAll: { products: proposedByProducts }
    }
  )
  .then(res => console.log(res))
  .catch(err => console.error(err));
}
const pullToProducts = () => {
  db.User.updateOne(
    { displayName: req.body.proposedTo },
    {
        $pullAll: { products: proposedToProducts }
    }
  )
  .then(res => console.log(res))
  .catch(err => console.error(err));
}
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
      {'displayName': req.params.id}
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
  },
  executeTrade: function(req, res) {
    db.User.updateOne(
      { displayName: req.body.proposedBy },
      {
          $push: { products: {$each: proposedToProducts} }
      })
      .then(data => {
        if (data) {
            console.log("already exists!");
        } else {
            pushToProducts(req.body);
            pullByProducts(req.body);
            pullToProducts(req.body);
        }
      })
  }
}
  // update: function (req, res) {
  //   console.log(req.body)
  //   db.User.replaceOne(
  //     { "products.uuid": req.body.proposedToProducts.uuid },
  //     { "products": req.body.proposedByProducts },
  //     (error, data) => {
  //       if (error) {
  //         res.send(error);
  //       } else {
  //         res.send(data);
  //       }
  //     },
  //   )
  // }


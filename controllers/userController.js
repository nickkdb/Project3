const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
        db.user.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    },
  findById: function(req, res) {
        db.user.findOne({
        where: {
            id: req.params.id
        }
        }).then(function(dbUser) {
        res.json(dbUser);
        });
    },
  create: function(req, res) {
    db.user.create(req.body).then(function(dbUser) {
        res.json(dbUser);
    });
  },
  update: function(req, res) {
    db.user.update(
        req.body,
        {
        where: {
            id: req.body.id
        }
        }).then(function(dbUser) {
        res.json(dbUser);
    });
},
  remove: function(req, res) {
    db.user.destroy({
        where: {
        id: req.params.id
        }
    }).then(function(dbUser) {
        res.json(dbUser);
    });
}
};
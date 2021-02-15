const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

module.exports = {

    findAll: function (req, res) {
        db.User.find({}).then(function (dbUser) {
            res.json(dbUser);
        });
    },

    create: function (req, res) {
        db.User.updateOne(
            {_id: mongojs.ObjectID(req.params.id)},
            {
                $push: { products: req.body }
            }
        )
        .then(dbModel => { res.json(dbModel) })
        .catch(err => { res.status(422).json(err) })
    },

    findOne: function (req, res) {
        db.User.findOne(
            {'products': {$elemMatch: {uuid: params.id}}}
        )
        .then(dbModel => {res.json(dbModel)})
        .catch(err => { res.status(422).json(err)})
    },
   

    update: function (req, res) {
        db.User.updateOne(
        {_id: mongojs.ObjectID(req.params.id), 'products.uuid': req.body.uuid }, {
            '$set': {
                'products.$.price': req.body.price,
                'products.$.description': req.body.description,
                'products.$.available': req.body.available
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
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
        )
    }
}
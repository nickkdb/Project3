const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

module.exports = {

    findAll: function (req, res) {
        db.User.find({}).then(function (dbUser) {
            res.json(dbUser);
        });
    },

    create: function ({ params, body }) {
        db.User.findByIdAndUpdate(
            params.id,
            {
                $push: { products: body }
            }
                .then(dbModel => { res.json(dbModel) })
                .catch(err => { res.status(422).json(err) })
        )
    },

    findOne: function (req, res) {
        db.User.findOne(
            {'cards': {$elemMatch: {uuid: params.id}}}
        )
        .then(dbModel => {res.json(dbModel)})
        .catch(err => { res.status(422).json(err)})
    },
   

    update: function (req, res) {
        db.User.findOneAndUpdate({ 'products.uuid': params.uuid }, {
            '$set': {
                'products.$.price': req.body.price,
                'products.$.notes': req.body.notes,
                'products.$.isAvailable': req.body.isAvailable
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
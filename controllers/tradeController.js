const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

module.exports = {

    find: function (req, res) {
        db.Trade.find({
            // $elemMatch: {users: req.params.id}
            // $or: [{
            //     "proposedBy": req.body.user
            // }, {
            //     "proposedTo": .body.user
            // }]
        }).then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(err => { res.status(422).json(err) })
    },
    create: function (req, res) {
        db.Trade
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findOne: function (req, res) {
        db.Trade.findOne(
            { users: { $all: [req.body.user1, req.body.user2] } }
        )
            .then(dbModel => { res.json(dbModel) })
            .catch(err => { res.status(422).json(err) })
    },


    update: function (req, res) {
        db.User.updateOne(
            { _id: mongojs.ObjectID(req.params.id) }, {
            '$set': {
                'status': req.body.status
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    remove: function (req, res) {
        db.Trade.findOneAndDelete(
            params.uuid,
            {
                uuid: req.params.uuid
            }
                .then(dbModel => { res.json(dbModel) })
                .catch(err => { res.status(422).json(err) })
        )
    }
}
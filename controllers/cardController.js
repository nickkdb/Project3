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
            { _id: mongojs.ObjectID(req.params.id) },
            {
                $push: { products: req.body }
            }
        )
            .then(dbModel => { res.json(dbModel) })
            .catch(err => { res.status(422).json(err) })
    },

    findOne: function (req, res) {
        db.User.findOne(
<<<<<<< HEAD
            {'products': {$elemMatch: {uuid: params.id}}}
=======
            { 'cards': { $elemMatch: { uuid: params.id } } }
>>>>>>> 7bb62cf5355fdc7f5b123ca72c74fbad88af724a
        )
            .then(dbModel => { res.json(dbModel) })
            .catch(err => { res.status(422).json(err) })
    },


    update: function (req, res) {
        db.User.updateOne(
            { _id: mongojs.ObjectID(req.params.id), 'products.uuid': req.body.uuid }, {
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
    //     db.User`
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    //     }
    // };



    // remove: function (req, res) {
    //     db.User.findOneAndDelete(
    //         params.uuid,
    //             {
    //                 $pull: {products: {uuid: req.params.uuid}}
    //             }
    //             .then(dbModel => {res.json(dbModel) })
    //             .catch(err => {res.status(422).json(err)})
    //     )
    // }
    remove: function (req, res) {
        console.log(req.params.id)
        console.log(req.params.uuid)
        db.User.updateOne(
            { '_id': mongojs.ObjectId(req.params.id) },
            { $pull: { 'products': { uuid: req.params.uuid } } }
        )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
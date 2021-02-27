const db = require("../models");
const moongoose = require("mongoose");
const mongojs = require("mongojs");

module.exports = {

    find: function (req, res) {
        db.Trade.aggregate([ {
            $addFields: { totalPriceBy:
              { $avg: "$proposedByProducts.price" },
               totalPriceTo:
              { $avg: "$proposedToProducts.price" }
              
              }
          }])
        .then(function (dbUser) {
            res.json(dbUser);
        });
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
        // console.log(req.body.status)
        db.Trade.updateOne(

            { _id: mongojs.ObjectID(req.params.id) }, {

            $set: {
                'status': req.body.status
            }


        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // remove: function (req, res) {
    //     db.Trade.findOneAndRemove(
    //         {
    //             _id: mongojs.ObjectID(req.params.id)
    //         }
    //             .then(dbModel => { res.json(dbModel) })
    //             .catch(err => { res.status(422).json(err) })
    //     )
    // }
    remove: function (req, res) {
        db.Trade.remove(
            {
                _id: mongojs.ObjectID(req.params.id)
            },
            (error, data) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(data);
                }
            },

        );
    }
}
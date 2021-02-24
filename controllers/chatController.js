const mongoose= require('mongoose');
const db= require("../models");

// const databaseUrl = "chatdb";
// const collections = ["chatdata"];

// const db = mongojs(databaseUrl, collections);
// db.on("error", error => {
//   console.log("Database Error:", error);
// });

module.exports= {

    writeMessage: (room, user, msg) => {
        db.Chat.updateOne({
            roomname: room
        },
        {
            $push: {
                messages: {
                    user: user,
                    msg: msg
                }
            }
        })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    },
    findUser: (user, cb) => {
        db.User.findOne({
            user: user
        })
        .then(data => cb(data))
        .catch(err => console.error(err))
    },
    findRoom: (room, cb) => {
        db.Chat.findOne({
            roomname: room
        })
        .then(data => cb(data))
        .catch(err => console.error(err))
    },
    updateSubject: (subject, room) => {
        db.User.updateMany(
            {'threads.room': room }, {
                $set: {
                    'threads.$.subject':  subject,
                }
            })
    }
}
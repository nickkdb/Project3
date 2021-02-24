const mongoose= require('mongoose');
const db= require("../models");


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
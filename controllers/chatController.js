const mongojs= require('mongojs');

// const databaseUrl = "chatdb";
// const collections = ["chatdata"];

// const db = mongojs(databaseUrl, collections);
// db.on("error", error => {
//   console.log("Database Error:", error);
// });

module.exports= {

    writeMessage: (room, user, msg) => {
        db.chatdata.updateOne({
            roomname: room
        },
        {
            $push: {
                messages: {
                    user: user,
                    msg: msg
                }
            }
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
        })
    },
    findUser: (user, cb) => {
        db.userdata.findOne({
            user: user
        }, (err, data) => {
            if (err) {
                throw err;
            } else {
                cb(data);
            }
        })
    },
    findRoom: (room, cb) => {
        db.chatdata.findOne({
            roomname: room
        }, (err, data) => {
            if (err) {
                throw err;
            } else {
                cb(data);
            }
        })
    },
    updateSubject: (subject, room) => {
        db.userdata.updateMany(
            {'threads.room': room }, {
                $set: {
                    'threads.$.subject':  subject,
                }
            })
    }
}
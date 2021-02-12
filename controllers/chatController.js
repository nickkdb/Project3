const mongojs= require('mongojs');

const databaseUrl = "chatdb";
const collections = ["chatdata"];

const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});

module.exports= {
    checkForRoom: (room, cb) => {
        db.chatdata.findOne({
            roomname: room
        }, (err, data) => {
            if (err) {
                throw err
            } else if (data === null) {
                cb(false);
            } else {
                cb(true)
            }
        })
    },

    createRoom: (room, user) => {
        db.chatdata.insert({
            roomname: room,
            user: user,
            messages: []
        })
    },

    loadMessages: (room, cb) => {
       db.chatdata.findOne({
           roomname: room
       }, (err, data) => {
           if (err) {
               throw err;
           } else if (data === null || data.messages.length === 0) {
               cb(false)
           } else {
               cb(data);
           }
       }) 
    },

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
    }
}
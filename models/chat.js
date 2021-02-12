const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const {v4 : uuidv4} = require('uuid')

const chatchema = new Schema({
  roomname: { type: String, required: true, unique: true},
  users: [],
  messages: [
    {
      user: {
        type: String, 
        required: true
      },
      msg: {
        type: String, 
        required: false
      },
      time: {
          type: Date,
          default: Date.now
      }
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
